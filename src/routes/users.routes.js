const { Router } = require('express');
const router = Router();
const passport = require('passport');
require('../config/passport');

const {
	renderSignUpForm,
	renderSignInForm,
	signUp,
	signIn,
	logout
} = require('../controllers/users.controllers');

router.get('/signup', renderSignUpForm);

router.post('/signup', signUp);

router.get('/signin', renderSignInForm);

router.post('/signin', signIn);

router.get('/logout', logout);

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	})
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/signin' }),
	(req, res) => {
		return (
			res
				.status(200)
				// .cookie('jwt', signToken(req.user), {
				// 	httpOnly: true
				// })
				.redirect('/notes')
		);
	}
);

module.exports = router;
