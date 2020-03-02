const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs'
	})
);
app.set('view engine', '.hbs');

// Forces SSL for all routes in production

if (process.env.NODE_ENV === 'production') {
	app.get('*', function(req, res, next) {
		if (req.headers['x-forwarded-proto'] != 'https')
			res.redirect(['https://', req.get('Host'), req.url].join(''));
		else next(); /* Continue to other routes if we're not redirecting */
	});
}

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize()); // before session
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
