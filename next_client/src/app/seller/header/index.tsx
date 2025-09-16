'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container, Form, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        {/* Brand */}
        <Navbar.Brand as={Link} href="/seller" className="fw-bold">
          SellerHub
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/seller/auction" className="text-white">
              <i className="bi bi-hammer me-2"></i>
              Auctions
            </Nav.Link>
            <Nav.Link as={Link} href="/seller/warehouse" className="text-white">
              <i className="bi bi-box-seam me-2"></i>
              Products
            </Nav.Link>
            <Nav.Link as={Link} href="/seller/orders" className="text-white">
              <i className="bi bi-list-check me-2"></i>
              Orders
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <Form.Control
                type="search"
                placeholder="Search products, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0"
                style={{ borderRadius: '20px 0 0 20px' }}
              />
              <Button 
                variant="light" 
                type="submit"
                className="border-0"
                style={{ borderRadius: '0 20px 20px 0' }}
              >
                <i className="bi bi-search"></i>
              </Button>
            </div>
          </Form>

          {/* Profile Dropdown */}
          <NavDropdown
            title={
              <span className="text-white">
                <img
                  src="https://ui-avatars.com/api/?name=Seller&background=ffffff&color=007bff"
                  alt="Profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <span className="d-none d-md-inline">Seller Name</span>
              </span>
            }
            id="profile-dropdown"
            align="end"
            className="text-white"
          >
            <Dropdown.Item as={Link} href="/seller/profile">
              <i className="bi bi-person me-2"></i>
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} href="/seller/settings">
              <i className="bi bi-gear me-2"></i>
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </Dropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SellerHeader;