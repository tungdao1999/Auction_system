const itemRepository = require('../repositories/item.repository');
const userRepository = require('../repositories/user.repository');
const auctionRepository = require('../repositories/auction.repository');

const createItem = async (itemData, sellerId) => {
    // Validate seller ID
    const sellerExists = await userRepository.findSellerById(sellerId);
    if (!sellerExists) {
        throw new Error('Seller not found');
    }
    // Validate item data
    if (!itemData.name || !itemData.description || !itemData.sell_price) {
        throw new Error('Invalid item data');
    }

    // Create item
    itemData.sellerId = sellerId; // Associate item with seller
    return await itemRepository.createItem(itemData);
}

const getAllItems = async () => {
    return await itemRepository.getAllItems();
}

const getRelatedItems = async (auctionId) => {
    if(!auctionId) {
        throw new Error('Invalid auction ID');
    }
    const auction = await auctionRepository.findAuctionById(auctionId);
    if (!auction) {
        throw new Error('Auction not found');
    }
    return await itemRepository.getRelatedItems(auctionId);
}

module.exports = { 
    createItem,
    getAllItems,
    getRelatedItems
}