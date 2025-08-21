const itemService = require('../services/item.service');

// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createItem = async (req, res) => {
    try {
        const userId  = req.user.id;
        const itemData = req.body;
        const newItem = await itemService.createItem(itemData, userId);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllItems,
    createItem
}