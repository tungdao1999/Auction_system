const auctionRepository = require('../repositories/auction.repository');
const userRepository = require('../repositories/user.repository');
const itemRepository = require('../repositories/item.repository');
const bidRepository = require('../repositories/bid.repository');
const { ItemStatus } = require('../common/const');
const { sequelize } = require('../database/index');


const QuantityUpdateEnum = {
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE'
};

const getAllAuctions = async () => {
    return await auctionRepository.getAllAuctions();
}

// Single Responsibility: Separate validation logic
const validateAuctionData = (auctionData) => {
    console.log("validateAuctionData", auctionData);
    if (!auctionData || !auctionData.startingPrice || !auctionData.startTime) {
        throw new Error('Invalid auction data');
    }
    if (!auctionData.title || auctionData.title.trim().length === 0) {
        throw new Error('Auction title is required');
    }
    if (auctionData.startingPrice <= 0) {
        throw new Error('Starting price must be greater than 0');
    }
    if (new Date(auctionData.startTime) <= new Date()) {
        throw new Error('Start time must be in the future');
    }
};

// Single Responsibility: Separate item validation
const validateAuctionItems = (items) => {
    if (!items || items.length === 0) {
        throw new Error('At least one item is required for the auction');
    }
    
    for (const item of items) {
        if (!item.id || !item.quantity || item.quantity < 1) {
            throw new Error('Invalid item data in auction');
        }
    }
};

// Single Responsibility: Handle item processing
const processAuctionItems = async (auctionId, items, sellerId, transaction) => {
    for (const item of items) {
        const itemRecord = await itemRepository.findAvailableItemById(item.id, sellerId);
        if (!itemRecord) {
            throw new Error(`Item not found or not available: ${item.id}`);
        }
        if (item.quantity > itemRecord.quantity) {
            throw new Error(`Insufficient item quantity for item: ${item.id}`);
        }
        
        // Create auction item relationship
        await itemRepository.createAuctionItem(auctionId, item.id, item.quantity, transaction);
        
        // Update item inventory
        await updateItemInventory(itemRecord, item.quantity, transaction);
    }
};

// Single Responsibility: Handle inventory updates
const updateItemInventory = async (itemRecord, usedQuantity, updateEnum, transaction) => {
    if (updateEnum === QuantityUpdateEnum.DECREASE) {
        itemRecord.quantity -= usedQuantity;
        if (itemRecord.quantity === 0) {
            itemRecord.status = ItemStatus.UNAVAILABLE;
        }
    } else if (updateEnum === QuantityUpdateEnum.INCREASE) {
        itemRecord.quantity += usedQuantity;
        itemRecord.status = ItemStatus.AVAILABLE;
    }
    await itemRepository.updateItem(itemRecord, { transaction });
};

// Main function following Single Responsibility and Open/Closed principles
const createAuction = async (auctionData, sellerId) => {
    // Input validation
    validateAuctionData(auctionData);
    
    // Seller validation
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    }
    
    // Use managed transaction for better error handling
    return await sequelize.transaction(async (transaction) => {
        
        // Prepare auction data
        const auctionToCreate = {
            ...auctionData,
            sellerId,
            status: auctionData.status || ItemStatus.AVAILABLE
        };
        
        // Create auction
        const createdAuction = await auctionRepository.createAuction(auctionToCreate, transaction);
        
        // Process items if provided
        if (auctionData.items) {
            const itemArray = Array.isArray(auctionData.items) 
                ? auctionData.items 
                : JSON.parse(auctionData.items);
            
            validateAuctionItems(itemArray);
            await processAuctionItems(createdAuction.id, itemArray, sellerId, transaction);
        }
        
        return createdAuction;
    });
};

const getRunningAuction = async () => {
    return await auctionRepository.getRunningAuction();
}

const getRunningAuctionBySeller = async (sellerId) => {
    return await auctionRepository.getRunningAuctionBySeller(sellerId);
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
    const seller = await validateSeller(sellerId);

    return await sequelize.transaction(async (transaction) => {
        const existingAuction = await auctionRepository.findAuctionById(auctionData.id);
        if (!existingAuction) {
            throw new Error('Auction not found');
        }
        const items = auctionData.items ? (Array.isArray(auctionData.items) 
            ? auctionData.items 
            : JSON.parse(auctionData.items)) : [];
        validateAuctionItems(items);
        await updateAuctionItems(existingAuction.id, items, sellerId, transaction);
        // Update auction details
        const updatedAuction = await auctionRepository.updateAuction(auctionData, transaction);
        return updatedAuction;
    });
}

const updateAuctionItems = async (auctionId, items, sellerId, transaction) => {
    // Fetch existing auction items
    const existingItems = await itemRepository.findItemsByAuctionId(auctionId);
    const existingItemMap = new Map(existingItems.map(item => [item.id, item]));

    for (const item of items) {
        const itemRecord = await itemRepository.findAvailableItemById(item.id, sellerId);
        if (!itemRecord) {
            throw new Error(`Item not found or not available: ${item.id}`);
        }
        if (existingItemMap.has(item.id)) {
            // Update existing item quantity if changed
            const existingItem = existingItemMap.get(item.id);
            await itemRepository.updateAuctionItem({
                id: existingItem.id,
                quantity: item.quantity
            }, transaction);
            
            if (item.quantity !== existingItem.quantity) {
                const quantityDiff = item.quantity - existingItem.quantity;
                const updateEnum = quantityDiff > 0 ? QuantityUpdateEnum.DECREASE : QuantityUpdateEnum.INCREASE;
                await updateItemInventory(itemRecord, Math.abs(quantityDiff), updateEnum, transaction);
            }
        } else {
            // New item, create auction item relationship
            await itemRepository.createAuctionItem(auctionId, item.id, item.quantity, transaction);
            // Update item inventory
            await updateItemInventory(itemRecord, item.quantity, QuantityUpdateEnum.DECREASE, transaction);
        }
        existingItemMap.delete(item.id);
    }
    // Handle removed items
    for (const [itemId, existingItem] of existingItemMap) {
        // Restore item quantity
        const itemRecord = await itemRepository.findItemById(itemId);
        if (itemRecord) {
            itemRecord.quantity += existingItem.quantity;
            itemRecord.status = ItemStatus.AVAILABLE;
            await itemRepository.updateItem(itemRecord, transaction);
        }
        // Remove auction item relationship
        await itemRepository.deleteAuctionItem(auctionId, itemId, transaction);
    }
}


const validateSeller = async (sellerId) => {
    const seller = await userRepository.findSellerById(sellerId);
    if (!seller) {
        throw new Error('Seller not found');
    } else {
        return seller;
    }
}

module.exports = {
    getAllAuctions,
    createAuction,
    getRunningAuction,
    getScheduledAuctions,
    getAuction,
    updateAuction,
    getRunningAuctionBySeller
};