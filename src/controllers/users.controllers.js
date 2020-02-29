const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
	res.render('users/signup');
};

usersCtrl.signUp = (req, res) => {
	res.send('signUp');
};

usersCtrl.renderSignInForm = (req, res) => {
	res.render('users/signin');
};

usersCtrl.signIn = (req, res) => {
	res.send('signIn');
};

usersCtrl.logout = (req, res) => {
	res.send('logout');
};

module.exports = usersCtrl;
