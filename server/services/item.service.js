const itemRepository = require('../repositories/item.repository');
const userRepository = require('../repositories/user.repository');

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

module.exports = { 
    createItem,
    getAllItems
}