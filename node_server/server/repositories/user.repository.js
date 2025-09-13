const { Roles } = require('../common/const');
const { User, Buyer, Seller, sequelize } = require('../database/index');
const { Op, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const users = require('../database/models/users');

// This function finds a user by email or phone (identifier) number and role
const findUser = async (identifier) => {
    console.log("identifier", identifier);
    return await User.findOne({
        where: {
            [Op.or]: [
                { email: identifier },
                { phone: identifier }
            ]
        }
    })
}

// This function finds a user by email
const findBuyerByEmail = async (email) => {
    return await User.findOne({ 
      include: [{ model: Buyer, as : 'buyers' }],
      where: { email: email }
    });
}

// This function finds a user by phone number
const findBuyerByPhone = async (phone) => {
    return await User.findOne({ 
        include: [{ model: Buyer, as: 'buyers' }],
        where: { phone: phone }
    });
}

const findBuyerByUserId = async (userId) => {
    return await Buyer.findOne({ 
        where: { userId: userId }
    });
}

const findBuyerById = async (id) => {
    return await User.findOne({ 
        include: [{ model: Buyer, as: 'buyers', where: { id: id } }],
    });
}

// This function finds a user by email
const findSellerByEmail = async (email) => {
    return await User.findOne({ 
      include: [{ model: Seller, as : 'sellers' }],
      where: { email: email }
    });
}

// This function finds a user by phone number
const findSellerByPhone = async (phone) => {
    return await User.findOne({ 
        include: [{ model: Seller, as: 'sellers' }],
        where: { phone: phone }
    });
}

const findSellerById = async (id) => {
    return await User.findOne({ 
        include: [{ model: Seller, as: 'sellers', where: { id: id } }],
    });
}

const findSellerByUserId = async (userId) => {
    return await Seller.findOne({ 
        where: { userId: userId }
    });
}

// This function creates a new user in the database
const createUser = async (userData) => {
    // Create a new user
    return await sequelize.transaction(async (t) => {
        userData.id = userData.id || uuidv4(); 
        await User.create(userData, { transaction: t });
        if (userData.role === Roles.BUYER) {
            // Create a new buyer
            await Buyer.create({ 
                id: uuidv4(),
                userId: userData.id, 
            }, { transaction: t });
        }
        if (userData.role === Roles.SELLER) {
            // Create a new seller
            await Seller.create({ 
                id: uuidv4(),
                userId: userData.id 
            }, { transaction: t });
        }
    })
}

module.exports = { 
    findUser, 
    findBuyerByEmail,
    findBuyerByPhone,
    findBuyerByUserId,
    findSellerByEmail,
    findSellerByPhone,
    findSellerById,
    findSellerByUserId,
    createUser,
    findBuyerById
};