var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Schema = mongoose.Schema,
    port = 3000;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var recipeSchema = new Schema({
    name: String,
    recipes: [
        {
            title: String,
            description: String,
            ingredients: [
                {
                    name: String,
                    amount: Number,
                    unit: String
                }
            ]
        }
    ],
    meta: {
        likes: Number   
    }
});

var Recipe = mongoose.model('Recipe', recipeSchema);

var handleError = function (res) {
    res.status(500).json({});
};


/* API
    
    get /author                                                         --> all authors 
    get /author/:authorId                                               --> author information
    get /author/:authorId/recipes                                       --> all recipes from specific author
    
    post /author/:authorId
    post /author/:authorId/recipes
    post /author/:authorId/recipes/:recipeId/ingredients
    
*/

// GET
app.get('/api/author', function (req, res) {
    Recipe.find().select('name meta').exec(function (err, items) {
       res.json(items); 
    });
});

app.get('/api/author/:authorId', function (req, res) {
    Recipe.findOne()
          .where('_id', req.params.authorId)
          .select('author meta')
          .exec(function (err, item) {
            
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({
                    message: 'not found'
                });
            }
    });
});

app.get('/api/author/:authorId/recipes', function (req, res) {
    Recipe
        .findOne()
        .where('_id', req.params.authorId)
        .select('recipes')
        .exec(function (err, item) {
            if (item) {
                res.json(item);    
            } else {
                res.status(404).json({
                    message: 'not found'
                });
            }
        });
});

app.get('/api/author/:authorId/recipes/:recipeId', function (req, res) {
    var recipeId = req.params.recipeId;
    
    Recipe
        .findOne()
        .where('_id', req.params.authorId)
        .where('recipes._id').in([recipeId])
        .select('recipes')
        .exec(function (err, item) {
            if (item) {
                res.json(item.recipes.id(recipeId));    
            } else {
                res.status(404).json({
                    message: 'not found'
                });
            }
        });
});

app.get('/api/author/:authorId/recipes/:recipeId/ingredients', function (req, res) {
    var recipeId = req.params.recipeId;
    
    Recipe
        .findOne()
        .where('_id', req.params.authorId)
        .where('recipes._id').in([recipeId])
        .select('recipes')
        .exec(function (err, item) {
            if (item) {
                res.json(item.recipes.id(recipeId).ingredients);    
            } else {
                res.status(404).json({
                    message: 'not found'
                });
            }
        });
});

// POST
app.post('/api/author', function (req, res) {
    var author = new Recipe({
       name: req.body.name, 
       recipes: [],
       meta: {
         likes: 0  
       }
    });
    
    author.save(function (err) {
       if (err) {
           res.send(500);
       } else {
            res.json(author);       
       }
    });
});

app.post('/api/author/:authorId/recipes', function (req, res) {
    
    Recipe
        .findOne()
        .where('_id', req.params.authorId)
        .select('recipes')
        .exec(function (err, item) {
            
            if (err) {
                res.send(500);
            } else {
                var recipe = {
                    title: req.body.title,
                    description: req.body.description,
                    ingredients: req.body.ingredients || []
                };
                
                item.recipes.push(recipe);
                item.save(function (err) {
                    if (err) {
                        res.send(500);
                    } else {
                        res.json(item);
                    }
                });
            }
        });
});

app.post('/api/author/:authorId/recipes/:recipeId/ingredients', function (req, res) {
    var recipeId = req.params.recipeId;
    
    Recipe
        .findOne()
        .where('_id', req.params.authorId)
        .where('recipes._id').in([recipeId])
        .select('recipes')
        .exec(function (err, item) {
            if (item) {
                var ingredients = item.recipes.id(recipeId).ingredients;
                
                ingredients.push( 
                    {
                        name: req.body.name,
                        amount: +req.body.amount,
                        unit: req.body.unit,
                    }
                );
                
                item.save(function (err) {
                   if(err) {
                       res.send(500);
                   } else {
                       res.json(ingredients);   
                   }
                });
            } else {
                res.status(404).json({
                    message: 'not found'
                });
            }
        });
    
});

app.get('*', function (req, res) {
    res.sendfile('public/index.html');
});

app.listen(port, function () {
   console.log('server listening on port %s', port); 
});


mongoose.connect('mongodb://localhost/test');