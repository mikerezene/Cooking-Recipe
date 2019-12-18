var passport = require('passport');
require('../config/passport')(passport);

exports.jwtAuth = passport.authenticate('jwt', { session: false });