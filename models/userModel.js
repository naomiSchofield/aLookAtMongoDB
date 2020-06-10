const {Schema, model} = require('mongoose')

const user =  new Schema({
    userName: {type: String, required: true, unique: false },
    email: {type: String, required: true, unique: false },
    password: {type: String, required: true, unique: false },
}, {
    toObject: {
        virtuals: true
    }
})



module.exports = model ('users', user)