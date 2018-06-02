const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address !'],
    required: 'This Field Is Required.'
  },
  password: {
    type: String,
    required: 'This Field Is Required.'
  },
  name: {
    firstName: {
      type: String,
      required: 'This Field Is Required.',
      trim: true
    },
    lastName: {
      type: String,
      required: 'This Field Is Required.',
      trim: true
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  image: {
    type: String,
    default: 'avatar.jpg'
  },
  gender: {
    type: String
  },
  roles: {
    type: [String],
    enum: ['authenticated user', 'admin', 'super admin'],
    default: 'authenticated user'
  },
  playlists: [
    { type: mongoose.Schema.ObjectId, ref: 'Playlist' }
  ]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password') || this.isNew) {
    console.log(this.password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    console.log(`after hash : ${this.password}`);
  }
  next();
});

function autoPopulate(next) {
  this.populate('playlists');
  next();
}
// full name virtual field
userSchema.virtual('fullName').get(function () { return `${this.name.firstName} ${this.name.lastName}`; });

userSchema.methods.comparePassword = function (enteredPassword, savedPasword) {
  return bcrypt.compareSync(enteredPassword, savedPasword);
};

userSchema.pre('findById', autoPopulate);
userSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('User', userSchema);
