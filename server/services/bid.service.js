const bidRepository = require('../repositories/bid.repository');
const auctionRepository = require('../repositories/auction.repository');
const { AuctionStatus } = require('../common/const');

const createBid = async (bidData, buyerId) => { 
    // Validate bid data
    if (!bidData.auctionId || !bidData.price || !bidData.itemId) {
        throw new Error('Invalid bid data');
    }

    // Validate auction
    const auction = await auctionRepository.findAuctionById(bidData.auctionId);
    console.log('Auction:', auction.status, AuctionStatus.ONGOING);
    if (!auction || !auction.status === AuctionStatus.ONGOING) {
        throw new Error('Auction not valid');
    }

    // highest bid logic
    const highestBid = await bidRepository.findHighestBidByAuctionId(bidData.auctionId);
    if (highestBid && bidData.price <= highestBid.price) {
        throw new Error('Bid price must be higher than the current highest bid');
    }

    // Create bid
    bidData.buyerId = buyerId; // Associate bid with buyer
    bidData.status = bidData.status || 'PENDING';
    return await bidRepository.createBid(bidData);
}

module.exports = {
    createBid 
};