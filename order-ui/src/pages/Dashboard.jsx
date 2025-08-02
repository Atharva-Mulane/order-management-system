import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner, Table } from 'react-bootstrap';
import { Download, FileEarmarkText } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        orderService.getAllOrders()
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Orders Dashboard</h2>
                <Button variant="primary" onClick={() => navigate('/create')}>
                    Create New Order
                </Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th><FileEarmarkText /> Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>
                                        <Link to={`/orders/${order.orderId}`}>{order.orderId.substring(0, 8)}...</Link>
                                    </td>
                                    <td>{order.customerName}</td>
                                    <td>${order.orderAmount.toFixed(2)}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            href={order.invoiceFileUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <Download /> View
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Dashboard;