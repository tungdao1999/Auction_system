'use client';
import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [identifier, setIdentifier] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginParams = {
            identifier,
            password,
        };

        const response = await fetch('/api/auth/loginbuyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginParams),
        });

        if (response.ok) {
            const data = await response.json();
            // Assuming the token is returned as data.token
            localStorage.setItem('auction_token_buyer', data.token);
            window.location.href = '/auction';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    }

    return (
            <div className='card w-50 mx-auto mt-5' style={{ maxWidth: '500px',  background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="card-body p-5">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="identifier" className="form-label">Email or phone</label>
                            <input type="text" className="form-control" id="identifier" placeholder="Enter email or phone" 
                                onChange={(e) => setIdentifier(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="remember" 
                                checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <div className="text-center mt-3">
                            <p>
                                <a href="#" className="text-decoration-none">Forgot password?</a>
                            </p>
                            <p className="mb-0">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-decoration-none">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
    );
}
