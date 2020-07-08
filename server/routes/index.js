const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlLogs = require('../controllers/logs');
const ctrlMenu = require('../controllers/menu');
const ctrlTables = require('../controllers/tables');
const ctrlFeedback = require('../controllers/feedback');
const ctrlOrders = require('../controllers/orders');
const ctrlStatistics = require('../controllers/statistics');
const ctrlPurchases = require('../controllers/purchases');
const multer = require('multer');

const storageUsers = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/users');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    },
});
const storageCategories = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/categories');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    },
});
const storageDishes = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/dishes');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    },
});



const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}



const uploadUser = multer({
    storage: storageUsers,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const uploadCategories = multer({
    storage: storageCategories,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const uploadDishes = multer({
    storage: storageDishes,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//http://localhost:3000/api/balabla

// users
router.get('/users', ctrlUsers.getUsers);
router.post('/login', ctrlUsers.login);
router.get('/user/:_id', ctrlUsers.getUserById);
router.post('/addUser', uploadUser.single('avatarImage'), ctrlUsers.addUser);
router.patch('/editUser/:_id', uploadUser.single('avatarImage'), ctrlUsers.editUser);
router.delete('/deleteUser/:_id', ctrlUsers.deleteUser);

//logs
router.get('/logs', ctrlLogs.getSystemLogs);
router.post('/addLog', ctrlLogs.addSystemLog);

//menu
router.get('/categories', ctrlMenu.getCategories);
router.post('/addCategory', uploadCategories.single('categoryImage'), ctrlMenu.addCategory);
router.patch('/editCategory/:_id', uploadCategories.single('categoryImage'), ctrlMenu.editCategory);
router.delete('/deleteCategory/:_id', ctrlMenu.deleteCategory);
router.get('/categoryDishes/:_categoryId', ctrlMenu.getCategoryDishes);
router.post('/addCategoryDish/:_categoryId', uploadDishes.single('dishImage'), ctrlMenu.addCategoryDish);
router.patch('/editCategoryDish/:_categoryId/:_dishId', uploadDishes.single('dishImage'), ctrlMenu.editCategoryDish);
router.delete('/deleteCategoryDish/:_categoryId/:_dishId', ctrlMenu.deleteCategoryDish);

//tables
router.get('/tables', ctrlTables.getTables);
router.post('/addTable', ctrlTables.addTable);
router.patch('/editTable/:_id', ctrlTables.editTable);
router.delete('/deleteTable/:_id', ctrlTables.deleteTable);

//feedback
router.get('/getFeedback', ctrlFeedback.getFeedback);
router.post('/addFeedback', ctrlFeedback.addFeedback);
router.delete('/deleteFeedback/:_id', ctrlFeedback.deleteFeedback);

//orders
router.get('/orders', ctrlOrders.getOrders);
router.post('/addOrder', ctrlOrders.addOrder);
router.patch('/editOrder/:_id', ctrlOrders.editOrder);
router.delete('/deleteOrder/:_id', ctrlOrders.deleteOrder);

//purchases
router.get('/purchases', ctrlPurchases.getPurchases);
router.post('/addPurchase', ctrlPurchases.addPurchase);
router.patch('/editPurchase/:_id', ctrlPurchases.editPurchase);
router.delete('/deletePurchase/:_id', ctrlPurchases.deletePurchase);

//statistics
router.get('/statistics', ctrlStatistics.getStat);
router.patch('/editStatistics/:_id', ctrlStatistics.editStat);

module.exports = router;
