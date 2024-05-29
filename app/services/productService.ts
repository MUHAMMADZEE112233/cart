import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/benirvingplt/products/products';

export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
