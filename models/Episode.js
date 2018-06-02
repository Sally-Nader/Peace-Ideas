const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please Enter The Title Of Episode '
  },
  video: {
    type: String,
    required: 'Please Enter Video Link!'
  },
  description: {
    type: String
  },
  playlist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Playlist',
    required: 'Related Playlist Is Required.'
  }
});

module.exports = mongoose.model('Episode', episodeSchema);
