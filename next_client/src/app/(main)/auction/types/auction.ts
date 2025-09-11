export interface Auction {
    id:string;
    itemId: string;
    description: string;
    startTime: string;
    startingPrice: number;
    highestBid: number;
    title: string;
    sellerId: string;
    itemName: string;
    sellerName: string;
    itemImage?: string;
    mediaLink?: string;
    mediaType?: "image" | "video";
    biddings: Bidding[];
}

export interface Bidding {
    id: string;
    buyerId: string;
    buyerName: string;
    itemId: string;
    price: number;
    createdAt: string;
    status: string;
}