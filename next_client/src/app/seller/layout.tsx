import { PropsWithChildren } from "react";
import { Providers } from "../providers";
import './css/seller.css';
import NextTopLoader from "nextjs-toploader";
import SellerHeader from "./header";

export default function SellerLayout({
    children,
}: PropsWithChildren) {
    return (
        <Providers>
            <NextTopLoader color="#5750F1" showSpinner={false} />
            <SellerHeader />
            <div className="w-100 bg-light text-dark">
                {children}
            </div>
        </Providers>
    )
}

