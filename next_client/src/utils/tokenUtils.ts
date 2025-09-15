import { cookies } from "next/headers";

export async function getBuyerAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auction_token_buyer');
  return token ? token.value : null;
}

export async function getSellerAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auction_token_seller');
  return token ? token.value : null;
}