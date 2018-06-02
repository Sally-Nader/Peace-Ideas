const jwt = require('jsonwebtoken');

exports.check = (req, res, next) => {
  jwt.verify(req.session.userToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.redirect('back');
    }
    if (decoded) {
      req.session.userID = decoded.userId;
      req.session.userName = decoded.userName;
    }
    next();
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
