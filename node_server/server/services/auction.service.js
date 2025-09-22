const auctionRepository = require('../repositories/auction.repository');
const userRepository = require('../repositories/user.repository');
const itemRepository = require('../repositories/item.repository');
const bidRepository = require('../repositories/bid.repository');
const { ItemStatus } = require('../common/const');
const { sequelize } = require('../database/index');

const getAllAuctions = async () => {
    return await auctionRepository.getAllAuctions();
}

const createAuction = async (auctionData, sellerId) => {
    if (!auctionData || !auctionData.startingPrice || !auctionData.startTime) {
        throw new Error('Invalid auction data');
    }

    // validate seller
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    }
    
    const transaction = await sequelize.transaction();
    try {
        console.log('Creating auction with data:', auctionData);
        auctionData.sellerId = sellerId; // Associate auction with seller
        auctionData.status = auctionData.status || ItemStatus.AVAILABLE; 
        
        const createdAuction = await auctionRepository.createAuction(auctionData, transaction);
        
        // validate and process items
        if (auctionData.items) {
            const itemArray = Array.isArray(auctionData.items) ? auctionData.items : JSON.parse(auctionData.items);
            if (itemArray.length === 0) {
                throw new Error('At least one item is required for the auction');
            }
            
            // Use for...of loop instead of forEach for async operations
            for (const item of itemArray) {
                if (!item.id || !item.quantity || item.quantity < 1) {
                    throw new Error('Invalid item data in auction');
                }
                
                // Add await for async operation
                const itemRecord = await itemRepository.findAvailableItemById(item.id, sellerId);
                if (!itemRecord) {
                    throw new Error(`Item not found or not available: ${item.id}`);
                }
                if (item.quantity > itemRecord.quantity) {
                    throw new Error(`Insufficient item quantity for item: ${item.id}`);
                }
                
                // Add await and pass transaction
                await itemRepository.createAuctionItem(createdAuction.id, item.id, item.quantity, transaction);

                // Subtract item quantity
                itemRecord.quantity -= item.quantity;
                if (itemRecord.quantity === 0) {
                    itemRecord.status = ItemStatus.UNAVAILABLE;
                }
                await itemRepository.updateItem(itemRecord, { transaction });
            }
        }

        // Commit transaction with await
        await transaction.commit();
        return createdAuction;
    }
    catch (err) {
        // Rollback transaction with await
        await transaction.rollback();
        throw err;
    }
}

const getRunningAuction = async () => {
    return await auctionRepository.getRunningAuction();
}

const getAuction = async (auctionId) => {
    const auction = await auctionRepository.findAuctionById(auctionId);
    if (!auction) {
        throw new Error('Auction not found');
    }
    auction.biddings = await bidRepository.findBidsByAuctionId(auctionId);
    return auction;
}

const getScheduledAuctions = async (sellerId) => {
    return await auctionRepository.getScheduledAuctions(sellerId);
}

const updateAuction = async (auctionData, sellerId) => {
    if (!auctionData || !auctionData.startingPrice || !auctionData.startTime) {
        throw new Error('Invalid auction data');
    }
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    }
}

module.exports = {
    getAllAuctions,
    createAuction,
    getRunningAuction,
    getScheduledAuctions,
    getAuction
};