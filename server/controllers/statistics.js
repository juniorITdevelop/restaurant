const mongoose = require('mongoose');
const Stat = mongoose.model('Statistics');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.getStat = function(req, res){
	Stat.find()
		.exec()
		.then(docs => {
				if(docs){
					return sendJsonResponse(res, 200, docs[0]);
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

module.exports.editStat = function(req, res){
	var id = req.params._id; 
	const statistic = new Stat({
        orders: JSON.parse(req.body.orders),
        feedback: JSON.parse(req.body.feedback),
        purchases: JSON.parse(req.body.purchases)
	});
    Stat.findByIdAndUpdate(id, statistic)
        .exec()
        .then(result => {
            return sendJsonResponse(res, 200, result);
        })
        .catch(err =>{
			console.log(err.message)
            return sendJsonResponse(err, 500, {error: message})
        });

}
