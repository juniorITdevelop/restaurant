const mongoose = require('mongoose');
const Menu = mongoose.model('Menu');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getCategories = function(req, res){
    Menu.find()
    .exec()
    .then(docs => {
            if(docs){
                return sendJsonResponse(res, 200, docs);
            } else {
                return sendJsonResponse(res, 404, {message: "Data dont found"});
            }
        }
    )
    .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        }
    );
};

module.exports.addCategory = function(req, res){
    Menu.find()
		.exec()
		.then(docs => {
	        const cat = new Menu({
		        _id: new mongoose.Types.ObjectId(),
                categoryName: req.body.categoryName,
                dishes: []
            });
            if(req.file != undefined){
                cat.categoryImage = req.file.path;
            } else {
                cat.categoryImage = 'assets/images/categories/default-category.png';
            }
            cat.save(function(err){
		        if(err){
			        return sendJsonResponse(res, 400, err);
		        } else {
			        return sendJsonResponse(res, 201, "Created");
		        }
            });
        })
        .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        });
};

module.exports.editCategory = function(req, res){
    const cat = new Menu({
        categoryName: req.body.categoryName,
        dishes: JSON.parse(req.body.dishes)
    });
    console.log(cat)
    if(req.file != undefined){
        cat.categoryImage = req.file.path;
        Menu.findByIdAndUpdate(req.params._id, cat)
            .exec()
            .then(result => {
                return sendJsonResponse(res, 200, result);
            })
            .catch(err =>{
                return sendJsonResponse(err, 500, {error: err})
            });
    } else {
        Menu.findById(req.params._id)
        .exec()
        .then(result => {
            cat.categoryImage = result.categoryImage;
            Menu.findByIdAndUpdate(req.params._id, cat)
            .exec()
            .then(result => {
                return sendJsonResponse(res, 200, result);
            })
            .catch(err =>{
                return sendJsonResponse(err, 500, {error: err})
            });
        })
    }
};

module.exports.deleteCategory = function(req, res){
    var id = req.params._id; 
	Menu.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};

module.exports.getCategoryDishes = function(req, res){
	Menu.findById(req.params._categoryId)
    .exec()
    .then(result => {
        return sendJsonResponse(res, 200, result.dishes);
    })
    .catch(err =>{
        return sendJsonResponse(err, 500, {error: err})
    });
};

module.exports.addCategoryDish = function(req, res){
    Menu.findById(req.params._categoryId)
    .exec()
    .then(cat => {
        let exist = cat.dishes.findIndex(item => item.dishName == req.body.dishName);
        if(exist != -1){
            return sendJsonResponse(res, 409, {message: "Dish with this name already exists"});
        } else {
            let dishObj = {
                _id: new mongoose.Types.ObjectId(),
                dishName: req.body.dishName,
                cost: req.body.cost,
                weight: req.body.weight,
                cookingTime: req.body.cookingTime,
                description: req.body.description,
                recipe: req.body.recipe,
                specialOffer: req.body.specialOffer
            }
            if(req.file != undefined){
                dishObj.dishImage = req.file.path;
            } else {
                dishObj.dishImage = 'assets/images/dishes/default-dish.png';
            }
            cat.dishes.push(dishObj);
            Menu.findByIdAndUpdate(req.params._categoryId, cat)
            .exec()
            .then(result => {
                return sendJsonResponse(res, 200, result);
            })
            .catch(err =>{
                return sendJsonResponse(err, 500, {error: err})
            });
        }
    })
};

module.exports.editCategoryDish = function(req, res){
	Menu.findById(req.params._categoryId)
    .exec()
    .then(cat => {
        let exist = cat.dishes.findIndex(item => item._id == req.params._dishId);
        cat.dishes[exist]._id = req.params._dishId;
        cat.dishes[exist].dishName = req.body.dishName;
        cat.dishes[exist].cost = req.body.cost;
        cat.dishes[exist].weight = req.body.weight;
        cat.dishes[exist].cookingTime = req.body.cookingTime;
        cat.dishes[exist].description = req.body.description;
        cat.dishes[exist].recipe = req.body.recipe;
        cat.dishes[exist].specialOffer = req.body.specialOffer;
        if(req.file != undefined){
            cat.dishes[exist].dishImage = req.file.path;
            Menu.findByIdAndUpdate(req.params._categoryId, cat)
            .exec()
            .then(result => {
                return sendJsonResponse(res, 200, result);
            })
            .catch(err =>{
                return sendJsonResponse(err, 500, {error: err})
            });
        } else {
            Menu.findByIdAndUpdate(req.params._categoryId, cat)
            .exec()
            .then(result => {
                return sendJsonResponse(res, 200, result);
            })
            .catch(err =>{
                return sendJsonResponse(err, 500, {error: err})
            });
        };
    });
};

module.exports.deleteCategoryDish = function(req, res){
    Menu.findById(req.params._categoryId)
    .exec()
    .then(cat => {
        let exist = cat.dishes.findIndex(item => item._id == req.params._dishId);
        cat.dishes.splice(exist, 1);
        Menu.findByIdAndUpdate(req.params._categoryId, cat)
        .exec()
        .then(result => {
            return sendJsonResponse(res, 200, result);
        })
        .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        });
    })	
};