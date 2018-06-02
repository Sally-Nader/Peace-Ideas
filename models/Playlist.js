const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please Enter Playlist Name !'

  },
  description: {
    type: String,
    trim: true,
    required: 'Please Enter Playlist Description !'
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Please Enter The Author Of Playlist !'
  },
  episodes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Episode'
    }
  ]
});

function autoPopulate(next) {
  this.populate('author episodes');
  next();
}

playlistSchema.pre('findById', autoPopulate);
playlistSchema.pre('findOne', autoPopulate);
playlistSchema.pre('find', autoPopulate);

module.exports = mongoose.model('Playlist', playlistSchema);
