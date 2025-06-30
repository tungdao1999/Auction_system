const Roles = {
    ADMIN: 'admin',
    BUYER: 'buyer',
    SELLER: 'seller',
}

const ItemStatus = {
    AVAILABLE: 'available',
    SOLD: 'sold',
    UNAVAILABLE: 'unavailable',
}

const BidStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
}

const AuctionStatus = {
    PENDING: 'pending',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
}
module.exports = {
    Roles, ItemStatus, AuctionStatus, BidStatus
};