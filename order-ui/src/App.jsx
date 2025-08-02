import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// We will create these page components in the next steps
import CreateOrder from './pages/CreateOrder';
import Dashboard from './pages/Dashboard';
const OrderDetail = () => <h2>Order Detail Page</h2>;

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Order Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/create">Create Order</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateOrder />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </Container>
      
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Router>
  );
}

export default App;