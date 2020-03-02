const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			// Match user's email
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: 'User does not exist yet.' });
			} else {
				// Match user's password
				const match = await user.matchPassword(password);
				if (match) {
					return done(null, user, { message: 'Welcome back!' });
				} else {
					return done(null, false, { message: 'Sorry, wrong password.' });
				}
			}
		}
	)
);

// Google configuration

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CONSUMER_KEY,
			clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
			callbackURL: '/auth/google/callback'
		},
		// Passport Callback Function
		async function(accessToken, refreshToken, profile, done) {
			// Check if Google User already exists
			console.log(profile.emails[0].value);
			const match = await User.findOne({ googleId: profile.id });
			if (match) {
				return done(null, match, {
					msg: `Welcome back ${profile.displayName}!`
				});
			} else {
				const newUser = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					googleId: profile.id
				});
				await newUser.save();
				return done(null, newUser, { msg: `Welcome ${profile.displayName}!` });
			}
		}
	)
);
