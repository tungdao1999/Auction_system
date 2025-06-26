const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        ...userData,
        password: hashedPassword,
    });
    return await user.save();
}

const validatePassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

module.exports = { findUserByEmail, createUser, validatePassword }