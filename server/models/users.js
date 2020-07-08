var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	surname: String,
	birdthDay: String,
	postId: String,
	postName: String,
	password: String,
	phone: String,
	email: String,
	avatarImage: String,
	registrationDate: String
});

mongoose.model('Users', userSchema, 'users');




// db.users.save({
// 	name: "Олег",
// 	surname: "Карпович",
// 	birdthDay: "10.09.1994",
// 	postName: "Адміністратор",
// 	postId: "p001",
// 	password: "1111",
// 	phone: "9999999999",
// 	email: "oleg.karpovich.94@gmail.com",
// 	avatarImage: "assets\\images\\users\\default-user.jpg",
//  registrationDate: "10.09.1994"
// })
// db.users.save({
// 	name: "Вікторія",
// 	surname: "Циба",
// 	birdthDay: "26.01.1990",
// 	postName: "Шеф-кухар",
// 	postId: "p002",
// 	password: "2222",
// 	phone: "8888888888",
// 	email: "viktoria.tsuba@gmail.com",
// 	avatarImage: "assets\\images\\users\\default-user.jpg",
//  registrationDate: "10.09.1994"
// })
// db.users.save({
// 	name: "Іван",
// 	surname: "Бірюк",
// 	birdthDay: "12.03.1995",
// 	postName: "Кухар",
// 	postId: "p003",
// 	password: "3333",
// 	phone: "7777777777",
// 	email: "biruk.ivan@gmail.com",
// 	avatarImage: "assets\\images\\users\\default-user.jpg",
//  registrationDate: "10.09.1994"
// })
// db.users.save({
// 	name: "Юрій",
// 	surname: "Годлевський",
// 	birdthDay: "24.07.1999",
// 	postName: "Офіціант",
// 	postId: "p004",
// 	password: "4444",
// 	phone: "6666666666",
// 	email: "godlevskiy@gmail.com",
// 	avatarImage: "assets\\images\\users\\default-user.jpg",
//  registrationDate: "10.09.1994"
// })