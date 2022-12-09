const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');


module.exports.register = (req, res, next) => {

    var user = new User();
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.fname = req.body.fname;
    user.lname = req.body.lname;


    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Phone numbeer already used!!!!']);
            else
                return next(err);
        }
    });
}


module.exports.authenticate = async (req, res, next) => {
    console.log("Login")
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.json({ error: "error" });
        // registered user
        else if (user) return res.json({ status: "ok", data: user.generateJwt()});
        // unknown user or wrong password
        else return res.json({ error: "error" });
    })(req, res);
}
 

module.exports.userProfile = async (req, res) =>{

    const { token } = req.body;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
  
      const phone = user.phone;
      User.findOne({ phone: phone })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
}