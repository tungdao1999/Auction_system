const bidRepository = require('../repositories/bid.repository');
const auctionRepository = require('../repositories/auction.repository');
const { AuctionStatus, BidStatus } = require('../common/const');

const createBid = async (bidData, buyerId) => { 
    // Validate bid data
    if (!bidData.auctionId || !bidData.price || !bidData.itemId) {
        throw new Error('Invalid bid data');
    }

    // Validate auction
    const auction = await auctionRepository.findAuctionById(bidData.auctionId);
    if (!auction || !auction.status === AuctionStatus.ONGOING) {
        throw new Error('Auction not valid');
    }

    // highest bid logic
    const highestPrice = await bidRepository.findHighestBidByAuctionId(bidData.auctionId);
    if (bidData.price <= highestPrice) {
        throw new Error('Bid price must be higher than the current highest bid');
    }

    // Create bid
    bidData.buyerId = buyerId; // Associate bid with buyer
    bidData.status = bidData.status || BidStatus.ACCEPTED;
    return await bidRepository.createBid(bidData);
}

module.exports = {
    createBid 
};