const { Item, sequelize } = require('../database/index');
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

module.exports = { 
    createItem,
    getAllItems,
    findItemById,
    findAvailableItemById
}
