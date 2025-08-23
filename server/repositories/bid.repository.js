const { Bid }  = require('../database/index');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const createBid = async (bidData) => {
    return await Bid.create({
        id: uuidv4(),
        ...bidData,
        createdAt: new Date(),
    });
}

const findHighestBidByAuctionId = async (auctionId) => {
    return await Bid.findOne({
        where: {
            auctionId: auctionId,
        },
        order: [['price', 'DESC'], ['createdAt', 'DESC']],
    });
}

const findBidsByAuctionId = async (auctionId) => {
    return await Bid.findAll({
        where: {
            auctionId: auctionId,
        },
        order: [['createdAt', 'DESC']],
    });
}

module.exports = { 
    createBid,
    findHighestBidByAuctionId,
    findBidsByAuctionId
}