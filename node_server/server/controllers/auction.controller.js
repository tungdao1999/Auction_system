const auctionService = require('../services/auction.service');
const Bree = require('bree');

// Create
const createAuction = async (req, res) => {
    try {
        const bree = new Bree({ root: false });
        const auctionData = req.body;
        const sellerId = req.user.id; 
        const newAuction = await auctionService.createAuction(auctionData, sellerId);

        bree.add({
            name: `auction_start_job_${newAuction.auctionId}`,
            path: './server/jobs/auction.js',
            interval: 10000, // Check every 10 seconds
            worker: { workerData: { auctionId: newAuction.auctionId } }
        })
        res.status(201).json(newAuction);
    } catch (err) {
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
        const auctionId = req.params.auctionId;
        if (!auctionId) {
            return res.status(400).json({ message: 'Invalid auction ID' });
        }
        const auction = await auctionService.getAuction(auctionId);
        res.status(200).json(auction);
    } catch (err) {
        console.log("err", err);
        res.status(400).json({ message: err.message });
    }
};

const getScheduledAuctions = async (req, res) => {
    try {
        const user = req.user;
        console.log("user", user);
        if (!user || user.role !== 'seller') {
            return res.status(403).json({ message: 'Forbidden: Seller access only' });
        }
        const scheduledAuctions = await auctionService.getScheduledAuctions(user.id);
        if (!scheduledAuctions) {
            return res.status(404).json({ message: 'Unknown error' });
        }
        
        res.status(200).json(scheduledAuctions);
    } catch (err) {
        console.log('scheduled auction err', err);
        res.status(400).json({ message: err.message });
    }
};

const updateAuction = async (req, res) => {
    try {
        const auctionId = req.params.auctionId;
        const auctionData = req.body;
        const sellerId = req.user.id;
        if (!auctionId) {
            return res.status(400).json({ message: 'Invalid auction ID' });
        }
        const updatedAuction = await auctionService.updateAuction(auctionId, auctionData, sellerId);
        res.status(200).json(updatedAuction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getRunningAuctionBySeller = async (req, res) => {
    try {
        const sellerId = req.user.id;
        if (!sellerId) {
            return res.status(400).json({ message: 'Invalid seller ID' });
        }
        const runningAuctions = await auctionService.getRunningAuctionBySeller(sellerId);
        res.status(200).json(runningAuctions);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    createAuction,
    getRunningAuction,
    getAuction,
    getScheduledAuctions,
    updateAuction,
    getRunningAuctionBySeller
};