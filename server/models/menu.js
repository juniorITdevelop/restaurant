var mongoose = require('mongoose')

var dishSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dishName: String,
    cost: String,
    weight: String,
    cookingTime: String,
    description: String,
    recipe: String,
    dishImage: String,
    specialOffer: String
});

var menuSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    categoryImage: String,
	dishes: [dishSchema]
});

mongoose.model('Menu', menuSchema, 'menu');