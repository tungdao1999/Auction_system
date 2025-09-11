'use client';

import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapModal from "@/components/modal";
import Bid from "./component/bid";
import { Auction } from "./types/auction";
import { createClientAxios } from "@/lib/axiosClient";
import AuctionCard from "./component/auctionCard";

const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Toys",
    "Books",
];

export default function AuctionPage() {

    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = useState<Auction>();
    const [isShowBid, setIsShowBid] = useState(false);

    useEffect(() => {
        async function fetchAuction() {
            try {
                const axiosInstance = await createClientAxios();
                const response = await axiosInstance.get('/api/auction/getRunningAuction');
                if (response.status === 200) {
                    const data = response.data;
                    setAuctions(data);
                }
                else {
                    console.log("Failed to fetch items");
                }
            }
            catch (error) {
                console.error("Failed to fetch items", error);
            }
        }
        fetchAuction();
    }, []);

    const updateSelectedAuction = async () => {
        setIsShowBid(false);
        try {
            if (selectedAuction?.id) {
                const axiosInstance = await createClientAxios();
                axiosInstance.get(`/api/auction/${selectedAuction.id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            const updatedAuction = response.data;
                            setSelectedAuction(updatedAuction);
                            setAuctions((prevAuctions) =>
                                prevAuctions.map((auc) =>
                                    auc.id === updatedAuction.id ? updatedAuction : auc
                                )
                            );
                        } else {
                            console.log("Failed to reload auction");
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to reload auction", error);
                    });
            }
        } catch (error) {
            console.error("Failed to reload auction", error);
        }
    }

    return (
        <div className="container py-4">
            {/* Landing Picture */}
            <div className="mb-4 rounded overflow-hidden" style={{ height: 220 }}>
                <img
                    src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
                    alt="Landing"
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectFit: "cover", borderRadius: "1rem" }}
                />
            </div>

            {/* Search Box */}
            <div className="row justify-content-center mb-3">
                <div className="col-md-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="form-control form-control-lg"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-10">
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                className="card shadow-sm border-primary"
                                style={{
                                    minWidth: 120,
                                    background: "#e3f2fd",
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    transition: "transform 0.1s",
                                }}
                            >
                                <div className="card-body text-center p-3">
                                    <span className="fw-bold text-primary">{cat}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row g-4">
                {auctions.map((auc) => (
                    <AuctionCard
                        key={auc.id}
                        auction={auc}
                        onBidClick={(auction) => {
                            setSelectedAuction(auction);
                            setIsShowBid(true);
                        }}
                    />
                ))}
            </div>
            <BootstrapModal
                id="bidModal"
                header="Place your bid"
                body={selectedAuction?.id && <Bid auctionId={selectedAuction?.id} onBidPlaced={updateSelectedAuction} />}
                size="xl"
                show={isShowBid}
                onClose={() => setIsShowBid(false)}
            />
        </div>
    );
}