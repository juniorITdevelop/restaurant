var mongoose = require('mongoose')

var purchaseSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    creationTime: String,
    purchaseNumber: String,
    purchaseStatus: String,
    totalCost: String,
    goods: [String]
});

mongoose.model('Purchases', purchaseSchema, 'purchases');