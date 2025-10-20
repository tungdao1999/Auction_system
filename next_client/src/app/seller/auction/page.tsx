'use client';

import React, { useEffect } from 'react';
import {Card, Container } from 'react-bootstrap';
import SellerAvailableAuctionPage from './available';
import { SellerOngoingAuctionPage } from './ongoing';

const AuctionPage: React.FC = () => {

    return (
        <Container fluid className="p-4">
           <SellerAvailableAuctionPage customStyle="mb-4"/>
           <SellerOngoingAuctionPage customStyle="mb-4"/>
            
        </Container>
    );
};

export default AuctionPage;
