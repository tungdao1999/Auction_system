const auctionRepository = require('../repositories/auction.repository');
const userRepository = require('../repositories/user.repository');
const itemRepository = require('../repositories/item.repository');
const bidRepository = require('../repositories/bid.repository');
const { ItemStatus } = require('../common/const');
const bid = require('../database/models/bid');

const getAllAuctions = async () => {
    return await auctionRepository.getAllAuctions();
}

const createAuction = async (auctionData, sellerId) => { 
    if (!auctionData || !auctionData.itemId 
        || !auctionData.startingPrice || !auctionData.startTime) {
        throw new Error('Invalid auction data');
    }

    // validate seller
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    }
    // validate item
    const item = await itemRepository.findAvailableItemById(auctionData.itemId, sellerId);
    if (!item) {
        throw new Error('Item not found');
    }

    // create auction
    auctionData.sellerId = sellerId; // Associate auction with seller
    auctionData.status ? 
        auctionData.status : auctionData.status = ItemStatus.AVAILABLE; // Default status to 'ONGOING' if not provided
    return await auctionRepository.createAuction(auctionData);
}

const getRunningAuction = async () => {
    return await auctionRepository.getRunningAuction();
}

const getAuction = async (auctionId) => {
    const auction = await auctionRepository.findAuctionById(auctionId);
    console.log('auction details:', auction);
    if (!auction) {
        throw new Error('Auction not found');
    }
    auction.biddings = await bidRepository.findBidsByAuctionId(auctionId);
    return auction;
}

module.exports = {
    getAllAuctions,
    createAuction,
    getRunningAuction,
    getAuction
}