import { Item } from "./item";

export interface Auction {
    id:string;
    description: string;
    startTime: string;
    startingPrice: number;
    highestBid: number;
    title: string;
    sellerId: string;
    sellerName: string;
    itemImage?: string;
    mediaLink?: string;
    mediaType?: "image" | "video";
    presetDuration: number; // in minutes
    biddings: Bidding[];
    items: Item[];
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