const mongoose = require('mongoose');
require('../models/User');
//import real data model
require('../models/Stone');

async function configDatabase() {
    //todo set database name
    const connectionString = 'mongodb://localhost:27017/earth-treasure';

    mongoose.connect(connectionString);


};

console.log('Database Connected');

module.exports = {
    configDatabase
};