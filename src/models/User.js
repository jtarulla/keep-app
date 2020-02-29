const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ timeStamps: true }
);

UserSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10, err => {
		if (err) throw err;
	});
	return await bcrypt.hash(password, salt, err => {
		if (err) throw err;
	});
};

UserSchema.methods.matchPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('user', UserSchema);
