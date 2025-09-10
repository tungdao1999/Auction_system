const { Auction, sequelize } = require('../database/index');
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
    const [result] = await sequelize.query(`
            SELECT auc.id, auc.itemId, auc.description, auc.startTime,
                COALESCE(MAX(bid.price), auc.startingPrice) AS highestBid,
                auc.title,
                auc.sellerId,
                it.name as itemName, 
                us.LastName as sellerName,
                it.image as itemImage
        FROM auction auc
        LEFT JOIN bid bid ON bid.auctionId = auc.id
        JOIN item it ON auc.itemId = it.id
        JOIN seller s ON auc.sellerId = s.id
        JOIN users us ON s.userId = us.id
        WHERE auc.status = 'ongoing' && auc.id = '${auctionId}'
        GROUP BY auc.id, auc.itemId, auc.description, auc.startTime, auc.startingPrice,
                 auc.title, auc.sellerId, it.name, us.LastName, it.image
        ORDER BY auc.startTime DESC
        `)
    return result[0] || null;
}

const getRunningAuction = async () => {
    const [results] = await sequelize.query(
        `SELECT auc.id, auc.itemId, auc.description, auc.startTime,
                COALESCE(MAX(bid.price), auc.startingPrice) AS highestBid,
                auc.title,
                auc.sellerId,
                it.name as itemName, 
                us.LastName as sellerName,
                it.image as itemImage
        FROM auction auc
        LEFT JOIN bid bid ON bid.auctionId = auc.id
        JOIN item it ON auc.itemId = it.id
        JOIN seller s ON auc.sellerId = s.id
        JOIN users us ON s.userId = us.id
        WHERE auc.status = 'ongoing'
        GROUP BY auc.id, auc.itemId, auc.description, auc.startTime, auc.startingPrice,
                 auc.title, auc.sellerId, it.name, us.LastName, it.image
        ORDER BY auc.startTime DESC`
    );
    return results || null;
};

module.exports = { 
    getAllAuctions,
    createAuction,
    findAuctionById,
    getRunningAuction
}