'use client';
import React, { useState } from 'react';

interface AuctionFormData {
    title: string;
    description: string;
    startingPrice: number;
    endDate: string;
}

const initialForm: AuctionFormData = {
    title: '',
    description: '',
    startingPrice: 0,
    endDate: '',
};

export default function SellerAuctionPage() {
    const [form, setForm] = useState<AuctionFormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'startingPrice'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Send form data to backend API
        setSubmitted(true);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create or Adjust Auction</h1>
            {submitted ? (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                    Auction submitted successfully!
                </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1" htmlFor="title">
                        Auction Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="startingPrice">
                        Starting Price
                    </label>
                    <input
                        id="startingPrice"
                        name="startingPrice"
                        type="number"
                        min={0}
                        value={form.startingPrice}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="endDate">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        name="endDate"
                        type="datetime-local"
                        value={form.endDate}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Auction
                </button>
            </form>
        </div>
    );
}