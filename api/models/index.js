const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/jalasoft', { useNewUrlParser: true });

// Export the models
exports.Cat = require('./cat');
exports.Tag = require('./tag');

mongoose.connection.on('error', () => console.log('Error connecting to MongoDB'));
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

exports.Connection = connection;