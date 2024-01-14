const { mongodbKey } = require('../keys')

const mongoose = require('mongoose')
mongoose.connect(mongodbKey)

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
    
})

const TodoSchema = new mongoose.Schema({
    title: String,
    done: Boolean
})

const User = mongoose.model('User', UserSchema)
const Todo = mongoose.model('Todo', TodoSchema)

module.exports = ({
    User,
    Todo
})