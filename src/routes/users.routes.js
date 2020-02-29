const { Router } = require('express');
const router = Router();

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

router.get('logout', logout);

module.exports = router;
