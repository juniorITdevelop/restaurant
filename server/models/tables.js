var mongoose = require('mongoose')

var tableSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tableName: String,
    sitsNumber: String,
    tableStatus: String,
    reservedTime: String,
    guestsCount: String,
    waiter: String
});

mongoose.model('Tables', tableSchema, 'tables');


// db.tables.save({
//     tableName: "Столик 2",
//     sitsNumber: "4",
//     tableStatus: "Зайнятий",
//     reservedTime: "",
//     guestsCount: "3",
//     waiter: "Вася Пупкін"
// })