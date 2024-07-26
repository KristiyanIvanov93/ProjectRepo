const { User } = require('../models/User');
const bcrypt = require('bcrypt');

// Add const identity (email or username etc)
const identityName = 'email';

async function register(identity, username, password) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} is already in use!`);
    }

    const user = new User({
        [identityName]: identity,
        username,
        password: await bcrypt.hash(password, 10),
    });

    await user.save();
    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error(`Incorrect ${identityName} or Password`);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error(`Incorrect ${identityName} or Password`);
    }

    return user;
}

module.exports = {
    register,
    login,
};
