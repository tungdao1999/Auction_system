// import { createServerAxios } from "@/lib/axiosClient";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//         const axiosServer = await createServerAxios(request);
//         const response = await axiosServer.get(`/api/auction/getRunningAuction`);
//         console.log("Response from backend:", response.data);
//         const data = response.data;
//         const res = NextResponse.json(data);
//         return res;
//     }
//     catch (error) {
//         console.error("Error fetching running auctions:", error);
//         return new Response(JSON.stringify({ error: "Failed to fetch running auctions" }), { status: 500 });
//     }
// }