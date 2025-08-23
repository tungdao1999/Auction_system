const auctionService = require('../services/auction.service');

// Create
const createAuction = async (req, res) => {
    try {
        const auctionData = req.body;
        const sellerId = req.user.id; 
        const newAuction = await auctionService.createAuction(auctionData, sellerId);
        res.status(201).json(newAuction);
    } catch (err) {
        console.error('Error creating auction:', err.message);
        res.status(400).json({ message: err.message });
    }
};

const getRunningAuction = async (req, res) => {
    try {
        const runningAuction = await auctionService.getRunningAuction();
        res.status(200).json(runningAuction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAuction = async (req, res) => {
    try {
        const auctionId = req.params.id;
        const auction = await auctionService.getAuction(auctionId);
        res.status(200).json(auction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createAuction,
    getRunningAuction,
    getAuction
};