import React from 'react';

const Footer: React.FC = () => (
    <footer style={{
        background: '#222',
        color: '#fff',
        padding: '2rem 0',
        textAlign: 'center',
        marginTop: 'auto'
    }}>
        <div>
            <h4>Auction House</h4>
            <p>
                &copy; {new Date().getFullYear()} Auction House. All rights reserved.
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                <a href="/terms" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'underline' }}>Terms</a>
                <a href="/privacy" style={{ color: '#fff', textDecoration: 'underline' }}>Privacy</a>
            </div>
        </div>
    </footer>
);

export default Footer;