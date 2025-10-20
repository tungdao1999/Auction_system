const { Item, sequelize, AuctionItem } = require('../database/index');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { ItemStatus, AuctionItemStatus } = require('../common/const');

const createItem = async (itemData) => {
    return await sequelize.transaction(async (t) => {
        const item = await Item.create({
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...itemData
        }, { transaction: t });
        return item;
    });
}

const getAllItems = async () => {
    return await Item.findAll({
        order: [['createdAt', 'DESC']],
    });
}

const findItemById = async (id) => {
    return await Item.findOne({
        where: { id: id }
    })
}

const findAvailableItemById = async (id, sellerId) => {
    return await Item.findOne({
        where: {
            id: id,
            sellerId: sellerId,
            status: ItemStatus.AVAILABLE
        }
    });
}

const getRelatedItems = async (auctionId) => {
    const result = await Item.findAll({
        attributes: ['id', 'name', 'description', 'sell_price', 'image', 'status'],
        include: [{
            model: AuctionItem,
            as: 'auction_items',
            where: { auctionId },
            attributes: []
        }]
    });
    return result;
}

const findItemsBySellerId = async (sellerId) => {
    return await Item.findAll({
        where: { sellerId, status: ItemStatus.AVAILABLE },
        order: [['createdAt', 'DESC']],
    });
}

const createAuctionItem = async (auctionId, itemId, quantity, transaction = null) => {
    return await AuctionItem.create({
        auctionId,
        itemId,
        quantity,
        addedAt: new Date(),
        status: AuctionItemStatus.ADDED
    },
    { transaction });
}

const updateAuctionItem = async (item, transaction = null) => {
    return await AuctionItem.update({
        ...item,
    }, { 
        where: { id: item.id },
        transaction
    });
}

const findItemsByAuctionId = async (auctionId) => {
    return await AuctionItem.findAll({
        where: { auctionId }
    });
}

const updateItem = async (item, transaction = null) => {
    return await Item.update({
        ...item,
    }, { 
        where: { id: item.id },
        transaction
    });
}

module.exports = { 
    createItem,
    getAllItems,
    findItemById,
    findAvailableItemById,
    getRelatedItems,
    findItemsBySellerId,
    createAuctionItem,
    updateAuctionItem,
    findItemsByAuctionId,
    updateItem
}
