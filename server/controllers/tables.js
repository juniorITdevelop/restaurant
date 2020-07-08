const mongoose = require('mongoose');
const Tables = mongoose.model('Tables');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getTables = function(req, res){
    Tables.find()
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

module.exports.addTable = function(req, res){
    Tables.find()
		.exec()
		.then(docs => {
	        const table = new Tables({
		        _id: new mongoose.Types.ObjectId(),
                tableName: req.body.tableName,
                sitsNumber: req.body.sitsNumber,
                tableStatus: req.body.tableStatus,
                reservedTime: req.body.reservedTime,
                guestsCount: req.body.guestsCount,
                waiter: req.body.waiter
            });
            table.save(function(err){
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

module.exports.editTable = function(req, res){
        const table = new Tables({
            tableName: req.body.tableName,
            sitsNumber: req.body.sitsNumber,
            tableStatus: req.body.tableStatus,
            guestsCount: req.body.guestsCount,
            reservedTime: req.body.reservedTime,
            waiter: req.body.waiter
        });
        Tables.findByIdAndUpdate(req.params._id, table)
        .exec()
        .then(result => {
            return sendJsonResponse(res, 200, result);
        })
        .catch(err =>{
            return sendJsonResponse(err, 500, {error: err})
        });
};

module.exports.deleteTable = function(req, res){
    var id = req.params._id; 
	Tables.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};