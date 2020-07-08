const mongoose = require('mongoose');
const User = mongoose.model('Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.login = function(req, res){
	User.find({email: req.body.email})
		.exec()
		.then(user => {
				if(user.length < 1){
					return sendJsonResponse(res, 401, {message: "Auth failed"});
				}
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if(err){
						return sendJsonResponse(res, 401, {message: "Auth failed"});
					}
					if(result){
						const token = jwt.sign({
							email: user[0].email,
							userId: user[0]._id,
							userPost: user[0].postId
						}, 
						process.env.JWT_KEY,
						{
							expiresIn: "1h"
						})
						return sendJsonResponse(res, 200, {message: "Auth successful", token: token});
					}
					return sendJsonResponse(res, 401, {message: "Auth failed"});
				});
			}
		)
		.catch(err =>{
				return sendJsonResponse(err, 500, {error: err})
			}
		);	
};

module.exports.getUserById = function(req, res){
	var id = req.params._id; 
	User.findById(id)
		.exec()
		.then(doc => {
				if(doc){
					return sendJsonResponse(res, 200, doc);
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

module.exports.getUsers = function(req, res){
	User.find()
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

module.exports.addUser = function(req, res){
	User.find({email: req.body.email})
		.exec()
		.then(user => {
			if(user.length >= 1){
				return sendJsonResponse(res, 409, {message: "User with this email already exists"});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if(err){
						return sendJsonResponse(err, 500, {error: err})
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							name: req.body.name,
							surname: req.body.surname,
							birdthDay: req.body.birdthDay,
							postId: req.body.postId,
							postName: req.body.postName,
							password: hash,
							phone: req.body.phone,
							email: req.body.email,
							registrationDate: new Date()
						});
						if(req.file != undefined){
							user.avatarImage = req.file.path;
						} else {
							user.avatarImage = 'assets/images/users/default-user.png';
						}
						user.save(function(err){
							if(err){
								return sendJsonResponse(res, 400, err);
							} else {
								return sendJsonResponse(res, 201, "Created");
							}
						});
					}
				});
			}
		})
		.catch()
};

module.exports.editUser = function(req, res){
	if(req.body.password != 'undefined'){
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if(err){
				return sendJsonResponse(err, 500, {error: err})
			} else {
				const user = new User({
					name: req.body.name,
					surname: req.body.surname,
					birdthDay: req.body.birdthDay,
					postId: req.body.postId,
					postName: req.body.postName,
					password: hash,
					phone: req.body.phone,
					email: req.body.email,
					registrationDate: req.body.registrationDate
				});
				if(req.file != undefined){
					user.avatarImage = req.file.path;
					User.findByIdAndUpdate(req.params._id, user)
						.exec()
						.then(result => {
							return sendJsonResponse(res, 200, result);
						})
						.catch(err =>{
							return sendJsonResponse(err, 500, {error: err})
						});
				} else {
					User.findById(req.params._id)
					.exec()
					.then(result => {
						user.avatarImage = result.avatarImage;
						User.findByIdAndUpdate(req.params._id, user)
						.exec()
						.then(result => {
							return sendJsonResponse(res, 200, result);
						})
						.catch(err =>{
							return sendJsonResponse(err, 500, {error: err})
						});
					})
				}
			}
		});
	} else {
		const user = new User({
			name: req.body.name,
			surname: req.body.surname,
			birdthDay: req.body.birdthDay,
			postId: req.body.postId,
			postName: req.body.postName,
			phone: req.body.phone,
			email: req.body.email,
			registrationDate: req.body.registrationDate
		});
		if(req.file != undefined){
			User.findById(req.params._id)
			.exec()
			.then(result => {
				user.password = result.password;
				user.avatarImage = req.file.path;
				User.findByIdAndUpdate(req.params._id, user)
					.exec()
					.then(result => {
						return sendJsonResponse(res, 200, result);
					})
					.catch(err =>{
						return sendJsonResponse(err, 500, {error: err})
					});
				});
		} else {
			User.findById(req.params._id)
			.exec()
			.then(result => {
				user.password = result.password;
				user.avatarImage = result.avatarImage;
				User.findByIdAndUpdate(req.params._id, user)
				.exec()
				.then(result => {
					return sendJsonResponse(res, 200, result);
				})
				.catch(err =>{
					return sendJsonResponse(err, 500, {error: err})
				});
			})
		}
	}
};


module.exports.deleteUser = function(req, res){
	var id = req.params._id; 
	User.remove({_id: id})
		.exec()
		.then(result => {
			return sendJsonResponse(res, 200, result);
		})
		.catch(err =>{
			return sendJsonResponse(err, 500, {error: err})
		});
};
