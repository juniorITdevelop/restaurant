const mongoose = require('mongoose');
const Orders = mongoose.model('Orders');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getOrders = function(req, res){
    Orders.find()
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

module.exports.addOrder = function(req, res){
    Orders.find()
		.exec()
		.then(docs => {
	        const order = new Orders({
		        _id: new mongoose.Types.ObjectId(),
                tableName: req.body.tableName,
                guestsCount: req.body.guestsCount,
	            additionalInfo: req.body.additionalInfo,
                creationTime: req.body.creationTime,
                waiter: req.body.waiter,
                sessionTime: req.body.sessionTime,
                orderNumber: req.body.orderNumber,
                orderStatus: req.body.orderStatus,
                deliveryType: req.body.deliveryType,
                totalCost: req.body.totalCost,
                dishes: JSON.parse(req.body.dishes)
            });
            order.save(function(err){
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

module.exports.editOrder = function(req, res){
    var id = req.params._id; 
    var editedOrder = new Orders({
        tableName: req.body.tableName,
        guestsCount: req.body.guestsCount,
	    additionalInfo: req.body.additionalInfo,
        creationTime: req.body.creationTime,
        waiter: req.body.waiter,
        sessionTime: req.body.sessionTime,
        orderNumber: req.body.orderNumber,
        orderStatus: req.body.orderStatus,
        deliveryType: req.body.deliveryType,
        totalCost: req.body.totalCost,
        dishes: JSON.parse(req.body.dishes)
    });
    Orders.findByIdAndUpdate(id, editedOrder)
        .exec()
        .then(result => {
            return sendJsonResponse(res, 200, result);
        })
        .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        });
};

module.exports.deleteOrder = function(req, res){
    var id = req.params._id; 
	Orders.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};