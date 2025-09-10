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
    WINNER: 'winner',
}

const AuctionStatus = {
    PENDING: 'pending',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
}

const AuctionItemStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ADDED: 'added', 
}
module.exports = {
    Roles, ItemStatus, AuctionStatus, BidStatus, AuctionItemStatus
};