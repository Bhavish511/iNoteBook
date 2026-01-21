const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/iNoteBook';

const connectToMongo =  () => {
    try {
        mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
