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

var feedbackSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    waiterName: String,
    serviceQuality: String,
	interier: String,
    foodQuality: String,
    comment: String,
    creationTime: String
});

var purchasesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    creationTime: String,
    purchaseNumber: String,
    purchaseStatus: String,
    goods: [String],
    status: String,
	totalCost: String
});

var statisticsSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    orders: [ordersSchema],
    feedback: [feedbackSchema],
    purchases: [purchasesSchema]
});

mongoose.model('Statistics', statisticsSchema, 'statistics');

// db.statistics.save({
//     orders: [{
//         _id: new ObjectId(),
//         tableName: '1',
//         guestsCount: '20',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Вадим Романюк',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 1,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3400',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '2'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '1'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '19'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '1',
//         guestsCount: '30',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Вадим Романюк',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 2,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3380',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '2',
//         guestsCount: '23',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Dec 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Вадим Романюк',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 3,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3980',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '4'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '2'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '3',
//         guestsCount: '33',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 25 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Вадим Романюк',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 4,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3380',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '4',
//         guestsCount: '29',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 25 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Вадим Романюк',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 5,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '2490',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '5'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '9'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '5',
//         guestsCount: '25',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 25 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 6,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3380',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '2',
//         guestsCount: '22',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 18 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 7,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3480',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '2'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '13'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '11'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '9'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '5',
//         guestsCount: '27',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 11 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 8,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3780',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '2'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '16'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '18'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '2'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '4',
//         guestsCount: '33',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 11 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 9,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3380',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '31',
//         guestsCount: '27',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Nov 4 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 10,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3880',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '11'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '1',
//         guestsCount: '24',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 28 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 11,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '1580',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '5'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '4'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '4'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '3'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '2',
//         guestsCount: '28',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 28 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 1',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 12,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '4180',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '11'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '9'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '4',
//         guestsCount: '22',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 21 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 2',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 13,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3780',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '18'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '13'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '3'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '5',
//         guestsCount: '31',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 21 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 2',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 14,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '2980',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '7'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '13'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '2'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '3',
//         guestsCount: '23',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 14 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 2',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 15,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '4080',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '18'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '1',
//         guestsCount: '40',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 14 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 16,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '2580',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '2'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '11'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '9'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '2',
//         guestsCount: '37',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 7 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 17,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3300',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '5'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '3'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '14'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '15'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '8'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '3',
//         guestsCount: '42',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Oct 7 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 18,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3500',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '7'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '6'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '13'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '14'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '4'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '4',
//         guestsCount: '45',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Sep 30 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 19,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '2980',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '4'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '2'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '14'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '11'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '3'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '5',
//         guestsCount: '35',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Sep 30 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 20,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '3980',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '10'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '12'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '17'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         }]
//     },{
//         _id: new ObjectId(),
//         tableName: '1',
//         guestsCount: '38',
//         additionalInfo: 'Додаткова інформація по замовленню від гостей',
//         creationTime: new Date("Mon Sep 30 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         waiter: 'Офіціант 3',
//         sessionTime: '',
//         orderNumber: new Date().getTime() + 21,
//         orderStatus: 'Замовлення закрито',
//         deliveryType: 'По готовності',
//         totalCost: '2880',
//         dishes: [{
//             _id: new ObjectId(),
//             dishName: 'Цезар',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '5'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Капрезе',
//             categoryName: 'Салати',
//             cost: '100',
//             specialOffer: '20',
//             cookingTime: '15',
//             cookingStatus: 'Готово',
//             count: '8'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Ліонський салат',
//             categoryName: 'Салати',
//             cost: '70',
//             specialOffer: '10',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '5'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Грибний суп',
//             categoryName: 'Супи',
//             cost: '60',
//             specialOffer: '',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '13'
//         },{
//             _id: new ObjectId(),
//             dishName: 'Вершковий суп з сьомгою',
//             categoryName: 'Супи',
//             cost: '120',
//             specialOffer: '5',
//             cookingTime: '10',
//             cookingStatus: 'Готово',
//             count: '7'
//         }]
//     }],
//     feedback: [{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 3',
//         serviceQuality: '4',
//         interier: '2',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Вадим Романюк',
//         serviceQuality: '5',
//         interier: '2',
//         foodQuality: '1',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 1',
//         serviceQuality: '3',
//         interier: '4',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Вадим Романюк',
//         serviceQuality: '1',
//         interier: '5',
//         foodQuality: '2',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 1',
//         serviceQuality: '2',
//         interier: '4',
//         foodQuality: '4',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 4',
//         serviceQuality: '4',
//         interier: '4',
//         foodQuality: '4',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 4',
//         serviceQuality: '3',
//         interier: '3',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 2',
//         serviceQuality: '5',
//         interier: '4',
//         foodQuality: '5',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 1',
//         serviceQuality: '5',
//         interier: '3',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 1',
//         serviceQuality: '3',
//         interier: '4',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 3',
//         serviceQuality: '4',
//         interier: '4',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 2',
//         serviceQuality: '5',
//         interier: '5',
//         foodQuality: '5',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 4',
//         serviceQuality: '4',
//         interier: '3',
//         foodQuality: '3',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 3',
//         serviceQuality: '3',
//         interier: '4',
//         foodQuality: '4',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },{
//         _id: new ObjectId(),
//         waiterName: 'Офіціант 2',
//         serviceQuality: '5',
//         interier: '5',
//         foodQuality: '5',
//         comment: 'Коментар',
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)")
//     },],
//     purchases: [{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '1570',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '850',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 9 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '1550',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '2150',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '3250',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Mon Dec 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '3250',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Sat Nov 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '3450',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Sat Nov 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '2050',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     },{
//         _id: new ObjectId(),
//         creationTime: new Date("Sat Nov 2 2019 10:46:22 GMT+0200 (GMT+02:00)"),
//         purchaseNumber: new Date().getTime(),
//         purchaseStatus: 'Закупку виконано',
//         totalCost: '1250',
//         goods: ['Апельсини', 'Капуста', 'Морква']
//     }]
// })