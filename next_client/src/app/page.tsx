import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; 

export default async function RootPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token');
  if (token) {
    // User logged in → go to product
    redirect('/product');
  } else {
    // Not logged in → go to login
    redirect('/login');
  }
}
