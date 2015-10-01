var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookModel = new Schema({
	title: {
		type:String
	},
	author: {type:String},
	genre: {type: String},
	read: {type: Boolean, default: false}
}, {collection:'Books'});

module.exports = mongoose.model('Books', BookModel);