import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { ArrowLeft, CalendarEvent, CashCoin, Download, PersonVcard } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        orderService.getOrderById(id)
            .then(response => {
                setOrder(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching order details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    if (!order) {
        return <h2>Order not found.</h2>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h2" className="mb-0">Order Detail</Card.Title>
                 <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft /> Back to Dashboard
                </Button>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Order ID:</strong> {order.orderId}
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <PersonVcard className="me-2" /> <strong>Customer Name:</strong> {order.customerName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <CashCoin className="me-2" /> <strong>Order Amount:</strong> ${order.orderAmount.toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <CalendarEvent className="me-2" /> <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Footer className="text-center">
                 <Button 
                    variant="primary" 
                    href={order.invoiceFileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="d-flex align-items-center mx-auto"
                >
                    <Download className="me-2" /> Download Invoice
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default OrderDetail;