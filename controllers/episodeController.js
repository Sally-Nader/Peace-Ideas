const Episode = require('../models/Episode');
const Playlist = require('../models/Playlist');

exports.addEpisode = async (req, res) => {
  const { playlistId } = req.params;
  const episode = new Episode(req.body);
  episode.playlist = playlistId;
  await episode.save();
  await Playlist.findByIdAndUpdate(playlistId, {
    $addToSet: { episodes: episode._id }
  }).exec().then(() => {
    req.flash('success', 'You Have Just Added Episode To Playlist Successfully.');
    res.redirect('/playlists');
  });
};

exports.episodeForm = (req, res) => {
  res.render('episodeForm', { title: 'Add Episode', playlistId: req.params.playlistId });
};

exports.episodeDelete = async (req, res) => {
  const { episodeId, playlistId } = req.params;
  await Episode.findByIdAndRemove(episodeId);
  await Playlist.findByIdAndUpdate(playlistId, {
    $pull: { episodes: episodeId }
  });
  res.redirect('back');
};
exports.viewEpisode = async (req, res) => {
  const { episodeId, playlistName } = req.params;
  const episode = await Episode.findById(episodeId);
  res.render('episode', { episode, playlistName });
};

// exports.allEpisodes = async (req, res) => {
//   const episodes = await Episode.find({});
//   res.render('episodes', { episodes });
// };
