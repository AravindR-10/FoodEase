import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => {
  return (
    <footer className="bg-dark text-light py-1 mt-auto" style={{ position: 'relative', bottom: 0, width: '100%' }}>
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} FoodEase. All rights reserved.</small>
        <br />
        <small>Contact us: support@foodease.com | +91 98765 43210</small>
      </Container>
    </footer>
  );
};

export default AppFooter;