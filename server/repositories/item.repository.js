const { Item, sequelize, AuctionItem } = require('../database/index');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { ItemStatus } = require('../common/const');

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

module.exports = { 
    createItem,
    getAllItems,
    findItemById,
    findAvailableItemById,
    getRelatedItems
}
