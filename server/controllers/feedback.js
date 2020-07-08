const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getFeedback = function(req, res){
	Feedback.find()
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

module.exports.addFeedback = function(req, res){
    Feedback.find()
		.exec()
		.then(docs => {
	        const feed = new Feedback({
		        _id: new mongoose.Types.ObjectId(),
                waiterName: req.body.waiterName,
                serviceQuality: req.body.serviceQuality,
                interier: req.body.interier,
                foodQuality: req.body.foodQuality,
                comment: req.body.comment,
                creationTime: new Date()
			});
            feed.save(function(err){
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

module.exports.deleteFeedback = function(req, res){
	var id = req.params._id; 
	Feedback.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};