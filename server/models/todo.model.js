const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
	title: String,
	description: String
});

module.exports = mongoose.model('todo', toDoSchema , 'todo')