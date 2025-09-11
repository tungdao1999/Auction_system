import React from "react";
import { Clock, Heart, X, DollarSign, User } from "lucide-react";

const cartItems = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        title: "Vintage Camera",
        description: "Classic film camera in excellent condition. Perfect for collectors.",
        seller: "JohnDoe",
        rating: 4.8,
        bids: 12,
        currentBid: "$120",
        endTime: "2h 15m",
        shipping: "Free Shipping",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        title: "Antique Vase",
        description: "Beautiful porcelain vase from the 19th century.",
        seller: "AntiqueQueen",
        rating: 4.9,
        bids: 8,
        currentBid: "$340",
        endTime: "5h 40m",
        shipping: "$15",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        title: "Rare Comic Book",
        description: "Limited edition superhero comic, well-preserved.",
        seller: "ComicGuy",
        rating: 4.7,
        bids: 21,
        currentBid: "$75",
        endTime: "1h 5m",
        shipping: "$5",
    },
];

export default function CartPage() {
    return (
        <div className="container py-5 bg-light min-vh-100">
            <h1 className="display-5 fw-bold mb-5 text-primary text-center">Your Auction Watch List</h1>
            <div className="w-100 mx-auto" style={{ maxWidth: "75%" }}>
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="row bg-white shadow rounded overflow-hidden border mb-4 p-0"
                        style={{ minHeight: 220 }}
                    >
                        {/* Image Column */}
                        <div className="col-md-5 position-relative p-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="img-fluid h-100 w-100 object-fit-cover"
                                style={{ minHeight: 220, maxHeight: 260 }}
                            />
                            <div className="position-absolute top-0 end-0 m-2 bg-white p-2 rounded-circle shadow">
                                <Heart className="text-danger" size={20} />
                            </div>
                            <div className="position-absolute bottom-0 start-0 m-2 bg-primary text-white px-3 py-1 rounded-pill small fw-semibold">
                                {item.bids} bids
                            </div>
                        </div>
                        {/* Info Column */}
                        <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-start">
                                    <h2 className="h4 fw-bold text-dark">{item.title}</h2>
                                    <button className="btn btn-link text-secondary p-0">
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="text-muted mt-2">{item.description}</p>
                                <div className="d-flex align-items-center mt-3 small">
                                    <User size={16} className="me-1 text-secondary" />
                                    <span className="text-primary fw-medium">Seller: {item.seller}</span>
                                    <span className="mx-2 text-muted">•</span>
                                    <span className="text-warning">★ {item.rating}/5.0</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="d-flex align-items-center h5 fw-bold text-success mb-1">
                                            <DollarSign size={20} className="me-1" />
                                            Current Bid: {item.currentBid}
                                        </div>
                                        <div className="d-flex align-items-center text-muted small mb-1">
                                            <Clock size={16} className="me-1" />
                                            Ends: {item.endTime}
                                        </div>
                                        <div className="text-muted small">
                                            Shipping: {item.shipping}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary px-4 py-2 fw-medium">
                                        Bid Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary px-4 py-2 fw-medium">
                        Continue Browsing
                    </button>
                    <button className="btn btn-success px-5 py-2 fw-medium">
                        Checkout Selected ({cartItems.length})
                    </button>
                </div>
            </div>
        </div>
    );
}
