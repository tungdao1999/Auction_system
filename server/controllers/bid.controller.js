const bidService = require('../services/bid.service');

const createBid = async (req, res) => {
    try {
        const bidData = req.body;
        const buyerId = req.user.id; 
        const newBid = await bidService.createBid(bidData, buyerId);
        res.status(201).json(newBid);
    }
    catch (err) {
        console.error('Error creating bid:', err.message);
        res.status(400).json({ message: err.message });
    }
}

module.exports = { 
    createBid
}