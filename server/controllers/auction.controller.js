const auctionService = require('../services/auction.service');

const createAuction = async (req, res) => {
    try {
        const auctionData = req.body;
        const sellerId = req.user.id; // Assuming the seller ID is stored in req.user
        const newAuction = await auctionService.createAuction(auctionData, sellerId);
        res.status(201).json(newAuction);
    } catch (err) {
        console.error('Error creating auction:', err.message);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createAuction
};