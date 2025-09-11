
import { PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import { Providers } from "../providers";


export default function MainLayout({
    children,
}: PropsWithChildren) {
    return (

        <Providers>
            <NextTopLoader color="#5750F1" showSpinner={false} />
            <div className="w-100 bg-light text-dark">
                <Header />
            </div>
            {children}
            <Footer />
        </Providers>
    );
}
