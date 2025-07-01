const { Auction, sequelize } = require('../database/index');

const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const getAllAuctions = async () => {
    return await Auction.findAll({
       order: [['createdAt', 'DESC']],
    });
}

// Create a new auction
const createAuction = async (auctionData) => {
    return await sequelize.transaction(async (t) => {
        const auction = await Auction.create({
            id: uuidv4(),
            ...auctionData
        }, { transaction: t });
        return auction;
    });
}

const findAuctionById = async (auctionId) => {
    return await Auction.findOne({
        where: {
            id: auctionId,
        },
    });
}

module.exports = { 
    getAllAuctions,
    createAuction,
    findAuctionById
}