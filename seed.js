var Recipe = require('./models/recipe'),
	mongoose = require('mongoose');

var recipes = [
	
	new Recipe({
		name: 'Jef Peeters', 
		recipes: [
			{
				title: 'Groentensoep',
				description: 'Lekkere groentensoep',
				ingredients: [
					{
						name: 'Wortelen',
                        amount: 2,
                        unit: 'st'	
					},
					{
						name: 'Selder',
                        amount: 1,
                        unit: 'st'	
					},
					{
						name: 'Prei',
                        amount: 1,
                        unit: 'st'	
					},
					{
						name: 'Bouillon',
                        amount: 2,
                        unit: 'dl'	
					}
				]
			}
		],
		meta: {
		 likes: 4  
		}	
	}),
	
	new Recipe({
		name: 'Jeroen Meus',
		recipes: [
			{
				title: 'Aardappelpuree',
				description: '',
				ingredients: [
					{
						name: 'aardappelen',
						amount: 0.5,
						unit: 'kg'
					}, 
					{
						name: 'melk',
						amount: 1,
						unit: 'dl'
					},
					{
						name: 'boter',
						amount: 10,
						unit: 'g'
					}
				]
			}
		],
		meta: {
			likes: 24	
		}
	})
];

recipes.forEach(function (recipe) {
	recipe.save(function (err) {
		if (!err) {
			console.log('Recipe saved');
		} else {
			console.log('Couldn\'t save recipe, error connecting database');
		}
	});
});


mongoose.connect('mongodb://localhost/recipe');