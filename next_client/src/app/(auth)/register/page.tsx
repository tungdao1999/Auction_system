import { useState } from 'react';
import React from 'react';
import Link from 'next/link';

// filepath: c:\Project\nextjs-admin-dashboard-main\nextjs-auction\src\app\(auth)\register\page.tsx
'use client';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (!agree) {
            alert('You must agree to the terms.');
            return;
        }
        const registerParams = {
            firstName,
            lastName,
            email,
            phone,
            password,
        };

        fetch('/api/auth/registerbuyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerParams),
        }).then(response => {
            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert('Registration failed. Please check your details.');
            }
        });
    };

    return (
        <div className='card w-50 mx-auto mt-5' style={{ maxWidth: '500px', background: 'rgba(255, 255, 255, 0.9)' }}>
            <div className="card-body p-5">
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter your name"
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter your last name"
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="Enter your phone"
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="agree"
                            checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                        <label className="form-check-label" htmlFor="agree">
                            I agree to the terms and conditions
                        </label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Already have an account?{' '}
                            <Link href="/login" className="text-decoration-none">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}