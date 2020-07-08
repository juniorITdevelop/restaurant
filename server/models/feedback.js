var mongoose = require('mongoose')

var feedbackSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    waiterName: String,
    serviceQuality: String,
	interier: String,
    foodQuality: String,
    comment: String,
    creationTime: String
});

mongoose.model('Feedback', feedbackSchema, 'feedback');
