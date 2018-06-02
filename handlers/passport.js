// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');
// const User = require('../models/User');

// module.exports = (passport) => {
//   const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET
//   };

//   passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
//     User.findById(jwtPayload.sub, (err, user) => {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     });
//   }));
// };
