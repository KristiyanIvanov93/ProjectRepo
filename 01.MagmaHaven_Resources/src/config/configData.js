const mongoose = require('mongoose');
require('../models/User');
//import real data model
require('../models/Volcano');

async function configDatabase() {
    //todo set database name
    const connectionString = 'mongodb://localhost:27017/magma-haven';

    mongoose.connect(connectionString);


};

console.log('Database Connected');

module.exports = {
    configDatabase
};