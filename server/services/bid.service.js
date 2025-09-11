const bidRepository = require('../repositories/bid.repository');
const auctionRepository = require('../repositories/auction.repository');
const userRepository = require('../repositories/user.repository');
const { AuctionStatus, BidStatus } = require('../common/const');
const ws = require('../websocket');

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

    const buyer = await userRepository.findBuyerByUserId(buyerId);
    if (!buyer) {
        throw new Error('Buyer not found');
    }

    // highest bid logic
    const highestPrice = await bidRepository.findHighestBidByAuctionId(bidData.auctionId);
    if (bidData.price <= highestPrice) {
        throw new Error('Bid price must be higher than the current highest bid');
    }

    // Create bid
    bidData.buyerId = buyerId; // Associate bid with buyer
    bidData.status = bidData.status || BidStatus.ACCEPTED;
    const createdBid = await bidRepository.createBid(bidData);
    createdBid.buyerId = buyerId;
    createdBid.buyerName = buyer.firstName + ' ' + buyer.lastName;

    // Notify all subscribers about the new bid
    ws.sendMessageToTopic(`bid-${bidData.auctionId}-${bidData.itemId}`, {
        createdBid 
    });

    return createdBid;
}

module.exports = {
    createBid 
};