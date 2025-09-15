import { IconAuctionHammer, IconDashboard, IconMessages, IconOrders, IconSettings, IconWarehouse } from "@/assets/icons";

export const SIDEBAR_ITEMS = [
    { label: 'Dashboard', icon: <IconDashboard></IconDashboard>, link: '/seller/dashboard' },
    { label: 'Warehouse', icon: <IconWarehouse></IconWarehouse>, link: '/seller/warehouse' },
    { label: 'Orders', icon: <IconOrders></IconOrders>, link: '/seller/orders' },
    { label: 'Auctions', icon: <IconAuctionHammer></IconAuctionHammer>, link: '/seller/auctions' },
    { label: 'Messages', icon: <IconMessages></IconMessages>, link: '/seller/messages' },
    { label: 'Settings', icon: <IconSettings></IconSettings>, link: '/seller/settings' },
];