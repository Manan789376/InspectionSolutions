const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User =require('../models/user');
const googlUser =require('../models/googleuser');
const fbUser =require('../models/facebookuser');
exports.user_signup =(req,res,next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}
exports.user_login =(req,res,next)=>{
    console.log(req.body);
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "helloworld",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}
exports.user_delete =(req,res,next)=>{
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
        console.log(result);
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.googleuser_signin=(req,res,next)=>{
    console.log(req.body);
    googlUser.find({ email: req.body.email })
      .exec()
      .then(googluser => {
        if (googluser.length >= 1) {
          return res.status(200).json({
            message: "Mail updated"
          });
        } 
             else {
              const googluser = new googlUser({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                userName:req.body.userName,
                userId:req.body.userId,
              
              });
              googluser
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "googleUser created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
}

 exports.fbuser_signup =(req,res,next)=>{
 fbUser.find({ userId: req.body.userId })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(200).json({
          message: "Mail updated"
        });
      } 
           else {
            const fbuser = new fbUser({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              userName:req.body.userName,
              userId:req.body.userId
            });
            fbuser
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "fbUser created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
    }