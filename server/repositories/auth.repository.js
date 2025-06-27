const { User, sequelize } = require('../database/index');
const { Op } = require('sequelize');

// This function finds a user by email or phone (identifier) number and role
const findUser = async (identifier, role) => {
    return await User.findOne({
        where: {
            [Op.or]: [
                { email: identifier },
                { phone: identifier }
            ],
            role: role
        }
    });
}

// This function finds a user by email
const findByEmail = async (email) => {
    return await User.findOne({ 
       where: { email: email} 
    });
}

// This function finds a user by phone number
const findByPhone = async (phone) => {
    return await User.findOne({ 
        where: {phone: phone} 
    });
}

// This function creates a new user in the database
const createUser = async (userData) => {
    // Create a new user
    return await User.create(userData);
}

module.exports = { 
    findUser, 
    findByEmail,
    findByPhone,
    createUser
};