var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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

module.exports = mongoose.model('Recipe', recipeSchema);