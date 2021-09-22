const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../secrets');
const sendMail=require('../nodemailer');
//----------routes-----------
authRouter.route("/signup").post(setCreatedAt, signupUser);

authRouter
  .route("/forgetPassword")
  .get(getForgetPassword)
  .post(postForgetPassword, validateEmail);

authRouter.route("/login").post(loginUser);

//---------functions----------------

function setCreatedAt(req, res, next) {
  let obj = req.body;
  //keys ka arr -> uska length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user if req.body is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  // let userDetails=req.body;
  // let name=userDetails.name;
  // let email=userDetails.email;
  // let password=userDetails.password;
  try {
    let userObj = req.body;
    // user.push({email,name,password});
    //put all data in mongo db
    
    // create document in userModel
    let user = await userModel.create(userObj);
    console.log("user", user);
    sendMail(user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function getForgetPassword(req, res) {
  res.sendFile("./public/forgetPassword.html", { root: __dirname });
}

function postForgetPassword(req, res, next) {
  let data = req.body;
  console.log("data", data);
  //check if email id is correct- validate
  next();
  //check if user exists in db
  // res.json({
  //     message:"data received",
  //     data:data.email
  // })
}

function validateEmail(req, res) {
  console.log("in validateEmail function");
  console.log(req.body);
  //hw to check if email is correct or not -> @ , .
  //indexOf
  res.json({
    message: "data received",
    data: req.body,
  });
}

async function loginUser(req, res) {
  try {
    //email password
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
          let payload=user['_id'];
          let token=jwt.sign({id:payload},JWT_KEY);
          console.log('token',token);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "user loged in",
          });
        } else {
          return res.json({
            message: "email or password is wrong",
          });
        }
      } else {
        return res.json({
          message: "email or password is wrong",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
