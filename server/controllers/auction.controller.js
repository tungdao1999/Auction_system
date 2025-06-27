const express = require('express');

const router = express.Router();

// Mock data
let auctions = [
    { id: 1, item: 'Vintage Clock', highestBid: 100, bids: [] },
    { id: 2, item: 'Antique Vase', highestBid: 200, bids: [] }
];

// Get all auctions
router.get('/auctions', (req, res) => {
    res.json(auctions);
});

// Get auction by ID
router.get('/auctions/:id', (req, res) => {
    const auction = auctions.find(a => a.id === parseInt(req.params.id));
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    res.json(auction);
});

// Place a bid
router.post('/auctions/:id/bid', (req, res) => {
    const auction = auctions.find(a => a.id === parseInt(req.params.id));
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    const { bidder, amount } = req.body;
    if (!bidder || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid bid data' });
    }
    if (amount <= auction.highestBid) {
        return res.status(400).json({ message: 'Bid must be higher than current highest bid' });
    }

    auction.highestBid = amount;
    auction.bids.push({ bidder, amount, time: new Date() });
    res.json({ message: 'Bid placed successfully', auction });
});

// Create a new auction
router.post('/auctions', (req, res) => {
    const { item, startingBid } = req.body;
    if (!item || typeof startingBid !== 'number') {
        return res.status(400).json({ message: 'Invalid auction data' });
    }
    const newAuction = {
        id: auctions.length + 1,
        item,
        highestBid: startingBid,
        bids: []
    };
    auctions.push(newAuction);
    res.status(201).json(newAuction);
});

module.exports = router;