const auctionRepository = require('../repositories/auction.repository');
const userRepository = require('../repositories/user.repository');
const itemRepository = require('../repositories/item.repository');

const getAllAuctions = async () => {
    return await auctionRepository.getAllAuctions();
}

const createAuction = async (auctionData, sellerId) => { 
    if (!auctionData || !auctionData.itemId 
        || !auctionData.startPrice || !auctionData.startTime || !auctionData.endTime) {
        throw new Error('Invalid auction data');
    }

    // validate seller
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    }
    // validate item
    const item = await itemRepository.findItemById(auctionData.itemId);
    if (!item) {
        throw new Error('Item not found');
    }

    // create auction
    auctionData.sellerId = seller.id; // Associate auction with seller
    return await auctionRepository.createAuction(auctionData);
}

module.exports = {
    getAllAuctions,
    createAuction
}