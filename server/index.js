let express = require('express'),
    path = require('path');
logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
flash = require('connect-flash');
LocalStrategy = require('passport-local').Strategy,
    routes = require('./routes/index')(passport),
    authenticate = require('./routes/authentication')(passport);
const app = express();
var dbConfig = require('./database.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url,{ useMongoClient: true });
// view engine setup 
//app.use(express.static('views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '../', 'dist/')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/signup', (req, res) => {
   res.send('Express received GET /signup'); 
});

// Initialize Passport
var initPassport = require('./controller/authenticate/init');
initPassport(passport);
app.use('/', routes);
app.use('/authen', authenticate);
// catch 404 and forward to error handler 
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers 
// development error handler 
// will print stacktrace 
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
