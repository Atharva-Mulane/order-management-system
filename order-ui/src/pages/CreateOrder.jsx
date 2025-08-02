import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { ArrowLeft, SendFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderService from '../services/orderService';

const CreateOrder = () => {
    const [customerName, setCustomerName] = useState('');
    const [orderAmount, setOrderAmount] = useState('');
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setInvoiceFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!customerName || !orderAmount || !invoiceFile) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('customerName', customerName);
        formData.append('orderAmount', orderAmount);
        formData.append('invoice', invoiceFile);

        orderService.createOrder(formData)
            .then(response => {
                toast.success('Order created successfully!');
                navigate('/');
            })
            .catch(error => {
                toast.error('Failed to create order.');
                console.error("Error creating order:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Card className="shadow-sm">
             <Card.Header>
                <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft /> Back
                </Button>
            </Card.Header>
            <Card.Body>
                <Card.Title as="h2" className="mb-4">Create New Order</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="customerName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="orderAmount">
                        <Form.Label>Order Amount</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder="Enter order amount" value={orderAmount} onChange={(e) => setOrderAmount(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="invoiceFile">
                        <Form.Label>Upload Invoice (PDF)</Form.Label>
                        <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading} className="d-flex align-items-center">
                        {loading ? <><Spinner as="span" animation="border" size="sm" className="me-2" /> Submitting...</> : <><SendFill className="me-2" /> Submit Order</>}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateOrder;