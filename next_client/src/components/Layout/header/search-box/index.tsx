'use client';

import { IconSearch } from '@/assets/icons';
import React, { FormEvent } from 'react';

interface SearchBoxProps {
    onSearch?: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = React.useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <form className="col-md-4 col-6 d-flex" role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button className="btn btn-light" type="submit">
                <IconSearch className="text-white" />
            </button>
        </form>
    );
};

export default SearchBox;