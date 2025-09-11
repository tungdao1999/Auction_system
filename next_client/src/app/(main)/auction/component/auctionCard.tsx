import React from "react";
import { Auction } from "../types/auction";

interface AuctionCardProps {
  auction: Auction;
  onBidClick: (auction: Auction) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onBidClick }) => (
  <div className="col-md-4 col-sm-6">
    <div className="card h-100 shadow-lg border-0" style={{ borderRadius: 16 }}>
      {auction.itemImage && (
        <img
          src={auction.itemImage}
          alt={auction.itemName}
          className="card-img-top"
          style={{ height: 160, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{auction.title}</h5>
        <p className="card-text text-muted mb-2">{auction.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-success">${auction.highestBid}</span>
          <button
            className="btn btn-primary btn-sm px-3 shadow"
            onClick={() => onBidClick(auction)}
          >
            Bid
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AuctionCard;