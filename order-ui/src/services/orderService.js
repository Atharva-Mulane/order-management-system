import axios from 'axios';


const API_URL = 'http://order-management-system-env.eba-9yeskcps.us-east-1.elasticbeanstalk.com/orders';
const getAllOrders = () => {
    return axios.get(API_URL);
};

const createOrder = (orderData) => {
    return axios.post(API_URL, orderData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getOrderById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Ensure all three functions are listed here
export default {
    getAllOrders,
    createOrder,
    getOrderById
};