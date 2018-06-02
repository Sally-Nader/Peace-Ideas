const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');
const checkAuth = require('../middleware/auth-check');

const userController = require('../controllers/userController');
const playlistController = require('../controllers/playlistController');
const episodeController = require('../controllers/episodeController');


const router = express.Router();

router.get('/', userController.home);
router.get('/episode/:playlistName/:episodeId', episodeController.viewEpisode);
router.get('/episode-form/:playlistId', episodeController.episodeForm);
router.post('/add-episode/:playlistId', episodeController.addEpisode);
router.get('/delete-episode/:episodeId/:playlistId', episodeController.episodeDelete);
router.get('/playlist/:id', playlistController.viewPlaylist);
router.get('/delete-playlist/:id', playlistController.deletePlaylist);
router.get('/playlists', catchErrors(playlistController.getAllPlaylists));
router.get('/playlist-form/:id?', playlistController.getPlaylistForm);
router.post('/add-playlist/:id?', playlistController.validatePlaylist, playlistController.addPlaylist);
router.get('/playlist/update/:id', playlistController.playlistUpdateForm);
router.get('/register', userController.getRegisterForm);
router.post('/register', userController.upload, userController.validateInputRegister, userController.registerUser);
router.post('/authenticate', userController.authenticate);
router.get('/login', userController.getLoginForm);
router.get('/logout', checkAuth.logout);
router.get('/my-profile', checkAuth.check, userController.getMyProfile);

module.exports = router;
