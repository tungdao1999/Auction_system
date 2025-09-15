
"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SIDEBAR_ITEMS } from "./data";

// filepath: c:\Project\Auction_system\next_client\src\app\seller\sidebar\index.tsx

const SellerSidebar: React.FC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <button
                className="btn btn-primary m-3"
                onClick={() => setVisible(true)}
                aria-label="Open sidebar"
            >
                <i className="pi pi-bars"></i> Menu
            </button>
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                position="left"
                className="p-sidebar-sm"
                style={{ width: "250px" }}
            >
                <div className="list-group">
                    {SIDEBAR_ITEMS.map((item: any, idx: number) => (
                        <a
                            key={idx}
                            href={item.link || "#"}
                            className="list-group-item list-group-item-action d-flex align-items-center"
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    ))}
                </div>
            </Sidebar>
        </>
    );
};

export default SellerSidebar;