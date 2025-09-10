const { Bid, sequelize }  = require('../database/index');
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
    const highestBid = await Bid.findOne({
        where: {
            auctionId: auctionId,
        },
        order: [['price', 'DESC'], ['createdAt', 'DESC']],
    });

    if (highestBid) return highestBid.price;

    const auction = await require('./auction.repository').findAuctionById(auctionId);
    if (auction && auction[0] && auction[0].length > 0) {
        return auction[0][0].startingPrice;
    }
    return 0;
}

const findBidsByAuctionId = async (auctionId) => {
    const [bids] = await sequelize.query(
        `SELECT bid.*, CONCAT(u.firstName,' ', u.LastName) as buyerName
        from bid bid 
        join buyer b on  bid.buyerId = b.id
        join users u on b.userId = u.Id
        where bid.auctionId = '${auctionId}'`
    );
    return bids;
};

module.exports = { 
    createBid,
    findHighestBidByAuctionId,
    findBidsByAuctionId
}