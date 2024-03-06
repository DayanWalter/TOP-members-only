const mongoose = require('mongoose');

const mongoDb = process.env.MONGODB_URI || process.env.DEV_DB_URL;

mongoose.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
