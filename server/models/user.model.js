const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fname:{type: String, required: 'phone number field can\'t be empty'},
    lname:{type: String, required: 'phone number field can\'t be empty'},
    phone: {type: String, required: 'phone number field can\'t be empty', unique: true},
    password: {type: String, required: 'Password can\'t be empty', minlength: [8, 'Password must be atleast 8 character long']},
    saltSecret: String
});


// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ phone: this.phone},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);