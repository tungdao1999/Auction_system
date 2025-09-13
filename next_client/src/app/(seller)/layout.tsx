import { PropsWithChildren } from "react";
import { Providers } from "../providers";
import { SidebarProvider } from "./sidebar/sidebar-context";
import './css/seller.css';

export default function SellerLayout({
    children,
}: PropsWithChildren) {
    return (
        <Providers>
            <SidebarProvider>
                <NextTopLoader color="#5750F1" showSpinner={false} />
                <div className="d-flex min-vh-100">
                    <SideBar/>
                    <div className="mx-auto w-100 container-xxl overflow-hidden p-4 p-md-4 p-xxl-5">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </Providers>
    )
}

