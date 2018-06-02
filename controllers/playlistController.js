const Playlist = require('../models/Playlist');
const User = require('../models/User');


exports.getPlaylistForm = async (req, res) => {
  let playlist = '';
  if (req.params.id) {
    playlist = await Playlist.findOne({ _id: req.params.id });
  }
  res.render('playlistForm', { title: 'Add Playlist', playlist });
};

exports.validatePlaylist = (req, res, next) => {
  req.checkBody('name', 'Please Enter Playlist Name').notEmpty();
  req.checkBody('description', 'Please Enter Playlist Description').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    const flashMessages = req.flash();
    res.render('playlistForm', { body: req.body, flashes: flashMessages, title: 'Add Playlist' });
  }
  next();
};

exports.addPlaylist = async (req, res) => {
  if (req.params.id) {
    Playlist.findByIdAndUpdate(req.params.id, req.body).exec();
    req.flash('success', 'Playlist Is Updated.');
  } else {
    req.body.author = req.session.userID;

    let playlist = new Playlist(req.body);
    playlist = await playlist.save();
    User.findByIdAndUpdate(
      req.body.author,
      { $addToSet: { playlists: playlist._id } }
    )
      .exec()
      .then((user) => { console.log(user); });
    req.flash('success', 'Playlist Is Created.');
  }
  res.redirect('/playlist-form');
};

exports.getAllPlaylists = async (req, res) => {
  const playlists = await Playlist.find({});
  res.render('viewPlaylists', { playlists });
};

exports.viewPlaylist = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  res.render('playlist', { playlist });
};

exports.playlistUpdateForm = async (req, res) => {
  const playlist = await Playlist.findOne({ _id: req.params.id });
  res.render('playlistForm', { playlist });
};

exports.deletePlaylist = async (req, res) => {
  await Playlist.findByIdAndRemove(req.params.id);
  res.redirect('back');
};
