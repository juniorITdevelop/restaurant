var mongoose = require('mongoose')

var logsSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: String,
    postId: String,
    postName: String,
	time: String,
	action: String
});

mongoose.model('Logs', logsSchema, 'logs');



// db.logs.save({
// 	user: "Олег Karpovich",
// 	postId: "p001",
// 	postName: "Адміністратор",
// 	action: "sdkjhflskd sdlkjgfkjsdfhsd kjhfsd",
// 	time: "10.09.94"
// })