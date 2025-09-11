'use client';
import { createClientAxios } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { Auction } from "../types/auction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Item } from "../types/item";
import { useWebSocket } from "@/app/providers/socketProvider";

export default function Bid({ auctionId }: { auctionId: string }) {
    const [bidAmount, setBidAmount] = useState(0);
    const [auctionDetails, setAuctionDetails] = useState<Auction | null>(null);
    const [relatedItems, setRelatedItems] = useState<Item[]>([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const { sendMessage, receiveMessage } = useWebSocket();

    useEffect(() => {
        const fetchData = async () => {
            const axiosInstance = await createClientAxios();
            const response = await axiosInstance.get(`/api/auction/${auctionId}`);
            if (response.status === 200) {
                setAuctionDetails(response.data);
            }
        };
        const fetchRelatedItems = async () => {
            const axiosInstance = await createClientAxios();
            await axiosInstance.get(`/api/item/getRelatedItems/${auctionId}`)
            .then((res) => { 
                setRelatedItems(res.data);
                const currentItemIndex = res.data.findIndex((item: Item) => item.status === 'active');
                setCurrentItemIndex(currentItemIndex);
            })
            .catch((error) => {
                console.error("Error fetching related items:", error);
            });
        };
        fetchData();
        fetchRelatedItems();
    }, [auctionId]);

    useEffect(() => {
        if (!auctionId) return;

        const topic = `bid-${auctionId}-${relatedItems[currentItemIndex]?.id}`;
        sendMessage(JSON.stringify({ action: "subscribe", topic }));

        receiveMessage((data) => {
            console.log("WebSocket message received:", data);
            if (data.topic === topic) {
                const newBid = data.message.createdBid;
                console.log("Received new bid via WebSocket:", newBid);
                auctionDetails?.biddings.unshift(newBid);
                setAuctionDetails({ ...auctionDetails! });
            }
        });

        return () => {
            sendMessage(JSON.stringify({ action: "unsubscribe", topic }));
        }
    }, [auctionId, relatedItems, currentItemIndex]);

    const handleBid = async () => {
        const axiosInstance = await createClientAxios();
        axiosInstance.post(`/api/bid/createBid`, { auctionId, itemId: relatedItems[currentItemIndex].id, price: bidAmount })
            .then((response) => {
                console.log("Bid placed successfully:", response.data);
            })
            .catch((error) => {
                console.error("Bid placement error:", error);
                // alert
            });
    };

    return (
        <div>
            <div className="row mb-4">
                <div className="col-12">
                    {auctionDetails && auctionDetails.mediaLink && (
                        <>
                            {auctionDetails.mediaType === "video" ? (
                                <video controls className="img-fluid rounded">
                                    <source src={auctionDetails.mediaLink} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={auctionDetails.mediaLink} alt="Auction Media" className="img-fluid rounded" />
                            )}
                        </>
                    )}
                </div>
                <div className="col-12">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="carousel-container"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass="carousel-item-padding-40-px"
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
                            desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
                            tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
                            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
                        }}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {relatedItems.map((item: Item) => (
                            <div key={item.id} className="card h-100">
                                <img src={item.image} alt={item.name} className="card-img-top" style={{ height: 180, objectFit: "cover" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <Table className="table table-bordered">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bidder</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auctionDetails?.biddings && auctionDetails.biddings.length > 0 && (
                                <>
                                    {auctionDetails.biddings.map((bidding) => (
                                        <TableRow key={bidding.id}>
                                            <TableCell>{bidding.buyerName}</TableCell>
                                            <TableCell>${bidding.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-between">
                    <div className="mb-3">
                        <label htmlFor="bidAmount" className="form-label">
                            <strong>Bidding Number:</strong>
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="bidAmount"
                                className="form-control"
                                value={bidAmount}
                                min={0}
                                step={10000}
                                onChange={(e) => setBidAmount(Number(e.target.value))}
                            />
                            <span className="input-group-text">VND</span>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm px-3 shadow w-100" onClick={handleBid}>
                            Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
