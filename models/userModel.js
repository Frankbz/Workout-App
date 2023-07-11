const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password){
        throw Error("All field must be filled!")
    }
    if (!validator.isEmail(email)){
        throw Error("Invalid email!")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password must include upper-case characters, lower-case characters and special characers!")
    }

    const exists = await this.findOne({email});

    if (exists) {
        throw Error("This email already exist!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password){
        throw Error("All field must be filled!")
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error("Incorrect email!")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password!")
    }

    return user
}

module.exports = mongoose.model('User', userSchema);
 
