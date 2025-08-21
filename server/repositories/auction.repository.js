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

const getRunningAuction = async () => {
    const [results] = await sequelize.query(
        `SELECT auc.id, auc.itemId, auc.description, auc.startTime,
                auc.startingPrice, auc.title,
                auc.itemId, auc.sellerId,
                it.name as itemName, us.LastName as sellerName
        
        FROM Auction auc
        JOIN item it on auc.itemId = it.id
        JOIN seller s on auc.sellerId = s.id
        join users us on s.userId = us.id
        WHERE auc.status = 'ongoing' 
        ORDER BY auc.startTime DESC LIMIT 1`
    );
    return results || null;
};

module.exports = { 
    getAllAuctions,
    createAuction,
    findAuctionById,
    getRunningAuction
}