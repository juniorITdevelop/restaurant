var mongoose = require('mongoose')

var orderDishesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    dishName: String,
    categoryName: String,
    cost: String,
    specialOffer: String,
    cookingTime: String,
    cookingStatus: String,
    count: String
});

var ordersSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	tableName: String,
    guestsCount: String,
	additionalInfo: String,
    creationTime: String,
    waiter: String,
    sessionTime: String,
    orderNumber: String,
    orderStatus: String,
    deliveryType: String,
    totalCost: String,
    dishes: [orderDishesSchema]
});

mongoose.model('Orders', ordersSchema, 'orders');


// db.orders.save({
//     tableName: "столик 1",
//     guestsCount: "2",
//     additionalInfo: "фівіфвіфв фівіфвіф іфвфівфі фівфів павпавп вапавпів фвафіва івфіаівф",
//     creationTime: "07.12.2019",
//     waiter: "вадим домінський",
//     sessionTime: "-",
//     orderNumber: "0001",
//     orderStatus: "Взято в роботу",
//     deliveryType: "По готовності",
//     totalCost: "1000",
//     dishes: [{
//         dishName: "Цезар",
//         categoryName: "Салати",
//         cost: "400",
//         specialOffer: "",
//         cookingTime: "15",
//         cookingStatus: "Очікування",
//         count: "2"
//     },
//     {
//         dishName: "М'ята",
//         categoryName: "Напої",
//         cost: "300",
//         specialOffer: "",
//         cookingTime: "15",
//         cookingStatus: "В прогресі",
//         count: "2"
//     }]
// })