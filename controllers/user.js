const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

let saltRounds = 10

exports.login = (req, res) => {
    try {

        const { email, password } = req.body

        if (!(email && password)) {
            return res
              .status(400)
              .json({ message: "please pass a proper Email id and password" });
        }

        userModel.findOne({ email: email.toLowerCase() }, (err,user) => {
            if (err) {
              res.status(404).json({ message: "User Not Found" });
            } else if (user === null || user === {}) {
              
                  let user = userModel({
                      email: email.toLowerCase(),
                      password: bcrypt.hashSync(password, saltRounds)
                  })
                  user.save((err, userData) => {
                      if(err) {
                          return res.status(404).json({message: "User exists"})
                      } else {
                        const payload = { _id: user._id };
                        let token = jwt.sign(payload, process.env.SECRET);
                        token = "JWT " + token;
                        res.status(200).json({
                            token
                        }) 
                      }
                  })
              
            } else if (bcrypt.compareSync(password, user.password)) {
                const payload = { _id: user._id };
                let token = jwt.sign(payload, process.env.SECRET);
                token = "JWT " + token;
                res.status(200).json({
                    token
                });
            } else {
                res.status(400).json({ message: "Incorrect Credentials" });
            }
          });
    } catch (err) {
        console.log(err);
    }
}
