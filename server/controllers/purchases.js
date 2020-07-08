const mongoose = require('mongoose');
const Purch = mongoose.model('Purchases');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getPurchases = function(req, res){
    Purch.find()
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

module.exports.addPurchase = function(req, res){
    Purch.find()
		.exec()
		.then(docs => {
	        const purchase = new Purch({
                _id: new mongoose.Types.ObjectId(),
                creationTime: new Date(),
                purchaseNumber: req.body.purchaseNumber,
                purchaseStatus: req.body.purchaseStatus,
                totalCost: req.body.totalCost,
                goods: JSON.parse(req.body.goods)
            });
            purchase.save(function(err){
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

module.exports.editPurchase = function(req, res){
    var id = req.params._id; 
    var purchase = new Purch({
        creationTime: req.body.creationTime,
        purchaseNumber: req.body.purchaseNumber,
        purchaseStatus: req.body.purchaseStatus,
        totalCost: req.body.totalCost,
        goods: JSON.parse(req.body.goods)
    });
    Purch.findByIdAndUpdate(id, purchase)
        .exec()
        .then(result => {
            return sendJsonResponse(res, 200, result);
        })
        .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        });
};

module.exports.deletePurchase = function(req, res){
    var id = req.params._id; 
	Purch.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};