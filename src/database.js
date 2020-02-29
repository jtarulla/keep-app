const mongoose = require('mongoose');

// Connect to Mongo
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(console.log('MongoDB Connected...'))
	.catch(error => console.log(error));
