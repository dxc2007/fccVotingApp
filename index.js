const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

let app = express();
let port = process.env.PORT || 8080;
let mongoUri = process.env.MONGOLAB_URI;

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load models
require('./server/models')(config);
// load passport strategies
require('./server/passport')(config);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middlewares/auth-check')(config);
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const pollRoutes = require('./server/routes/polls');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/polls', pollRoutes);

// start the server
app.listen(port, function() {
    console.log('Pirates on deck', port);
});
