
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

mongoose.Promise = global.Promise;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  }
});
exports.upload = multer({ storage }).single('image');

exports.getRegisterForm = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  newUser.image = req.file.filename;
  await newUser.save();
  req.flash('success', 'You have just registered you should login now');
  const flashes = req.flash();
  res.render('main', { flashes });
};

exports.validateInputRegister = (req, res, next) => {
  req.checkBody('name[firstName]', 'Please Enter Your First Name!').notEmpty();
  req.checkBody('name[lastName]', 'Please Enter Your Last Name!').notEmpty();
  req.checkBody('email').isEmail();
  req.checkBody('password', 'Please Enter The Password').notEmpty();
  req.checkBody('confirm-password', 'Please Confirm The Password!').notEmpty();
  req.checkBody('confirm-password', 'Oops! Your Passwords Doesn\'t Match').equals(req.body.password);
  // check if file input is not empty
  const uploadedPicture = (typeof req.file.originalname !== 'undefined') ? req.file.originalname : '';
  req.checkBody('image', 'Please Choose Image => jpeg, png').isImage(uploadedPicture);
  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    const flashMessages = req.flash();
    res.render('register', { body: req.body, flashes: flashMessages });
    return;
  }
  next();
};

exports.authenticate = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      const isRight = user.comparePassword(req.body.password, user.password);
      if (isRight) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
            userName: `${user.name.firstName} ${user.name.lastName}`
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400 // 24 hours
          }
        );
        req.session.userToken = token;
        res.redirect('/my-profile');
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
      }
    }
  });
};

exports.getLoginForm = (req, res) => {
  res.render('login');
};

exports.getMyProfile = async (req, res) => {
  const userId = req.session.userID;
  const user = await User.findById(userId);
  res.render('myProfile', { user });
};

exports.home = (req, res) => {
  res.render('home');
};
