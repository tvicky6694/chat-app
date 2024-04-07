const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rooms = require("../models/rooms");

const login = async (req, res, next) => {
  try {
    console.log("data",req.body.username);
    await users
      .findOne({ name: req.body.username })
      .exec()
      .then(async (data) => {
        console.log(data);
        if (data) {
          let match = await bcrypt.compare(req.body.password, data.password);
          if (match) {
            let token = jwt.sign(
              { user: data.name },
              process.env.JWT_TOKEN_SECRET,
              {
                expiresIn: process.env.JWT_TOKEN_TTL,
              }
            );
            req.session.token = token;
            req.session.user_id = data._id;
            let roomData = await rooms.find();
            res.render('home',{ userData: data,rooms:roomData});
          } else {
            res.render('login',{ err: true, msg: 'Username or Password Wrong'});
          }
        } else {
          res.render('login',{ err: true, msg: 'Username or Password Wrong'});
        }
      })
      .catch((err) => {
        console.log(err);
        res.render('login',{ err: true, msg: 'Username or Password Wrong'});
    });
  } catch (error) {
    console.log(error);
    res.render('login',{ err: true, msg: 'Something Went Wrong'});
  }
};

const register = async (req, res, next) => {
  try {
    const {username, password, confirmPassword } = req.body;
    if(password === confirmPassword){
      await users
        .findOne({ username: username })
        .exec()
        .then(async (data) => {
          if (data) {
            res.render('register',{ err: true, msg: 'User Exists'});
          } else {
            let hashPassword = await bcrypt.hash(password, 10);
            let userData = new users({
              name: username,
              password: hashPassword,
              active_status: 0,
            });
            let savedData = await userData.save();
            res.render('register',{ err: true, msg: 'User Created Successfully', data:savedData});
          }
        })
        .catch((err) => {
          console.log(err);
          res.render('register',{ err: true, msg: 'Something Went Wrong'});
        });
    }else{
      res.render('register',{ err: true, msg: 'Passwords Not Matched'});
    }
  } catch (error) {
    console.log(error);
    res.render('register',{ err: true, msg: 'Something Went Wrong'});
  }
};

const getOnlineUsers = async (req, res) => {
  try {
    let userData;
    let userDataCount;
    if (req.query.search != "undefined") {
      userData = await users
        .find({
          name: { $regex: req.query.search, $options: "i" },
        })
        .sort({ createdAt: -1 })
        .skip(req.query.skip)
        .limit(req.query.limit);
      userDataCount = await users
        .find({
          name: { $regex: req.query.search, $options: "i" },
        })
        .count();
    } else {
      userData = await users
        .find({})
        .sort({ createdAt: -1 })
        .skip(req.query.skip)
        .limit(req.query.limit);
      userDataCount = await users.find().count();
    }
    res.status(200).json({
      msg: "Data retrieved successfully",
      data: userData,
      count: userDataCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    let userData = await users.find({ _id: req.params.id });
    res
      .status(200)
      .json({ msg: "Data retrieved successfully", data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  login: login,
  register: register,
  getOnlineUsers: getOnlineUsers,
  getUserById: getUserById
};
