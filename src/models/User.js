const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true },
		password: String,
		googleId: String
	},
	{ timeStamps: true }
);

UserSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('user', UserSchema, 'Users');
