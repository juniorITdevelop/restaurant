const mongoose = require('mongoose');
const Logs = mongoose.model('Logs');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getSystemLogs = function(req, res){
	Logs.find()
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

module.exports.addSystemLog = function(req, res){
    Logs.find()
		.exec()
		.then(docs => {
	        const log = new Logs({
		        _id: new mongoose.Types.ObjectId(),
		        user: req.body.user,
                postName: req.body.postName,
                postId: req.body.postId,
	            time: new Date(),
	            action: req.body.action
	        });
            log.save(function(err){
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