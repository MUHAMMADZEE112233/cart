import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from '../productList';

// Mock data for testing
interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    colour: string;
}

interface BasketItem extends Product {
    qtyInBag: number;
}

const mockProducts: Product[] = [
    {
        id: 1,
        colour: 'Black',
        name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
        price: 10,
        img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    },
    {
        id: 2,
        colour: 'Stone',
        name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
        price: 4,
        img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
    },
    {
        id: 3,
        colour: 'Black',
        name: 'Black Frill Tie Shoulder Bodycon Dress',
        price: 7.99,
        img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
    },
    {
        id: 5,
        colour: 'Red',
        name: 'Red Pin Stripe Belt T Shirt Dress',
        price: 17,
        img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
    },
];

const mockEmptyBasket: BasketItem[] = [];
const mockBasketWithOneItem: BasketItem[] = [
    { id: 1, qtyInBag: 2, price: 10 }, // Same price for clarity (can be removed if different)
];

// Mock functions for props if needed:
jest.fn().mockImplementation((id) => ...);

test('renders empty basket message', () => {
    render(<ProductList products={mockProducts} basket={mockEmptyBasket} filter="all" />);
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument();
});

test('renders basket items with total amount', () => {
    render(<ProductList products={mockProducts} basket={mockBasketWithOneItem} filter="all" />);
    expect(screen.getByText('Black Sheet Strappy Textured Glitter Bodycon Dress')).toBeInTheDocument();
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
});

test('filters products by color', () => {
    render(<ProductList products={mockProducts} basket={mockEmptyBasket} filter="Black" />);
    expect(screen.getByText('Black Sheet Strappy Textured Glitter Bodycon Dress')).toBeInTheDocument();
    expect(screen.queryByText('Stone Ribbed Strappy Cut Out Detail Bodycon Dress')).not.toBeInTheDocument();
});

test('filters products by "all"', () => {
    render(<ProductList products={mockProducts} basket={mockEmptyBasket} filter="all" />);
    expect(screen.getByText('Black Sheet Strappy Textured Glitter Bodycon Dress')).toBeInTheDocument();
    expect(screen.getByText('Stone Ribbed Strappy Cut Out Detail Bodycon Dress')).toBeInTheDocument();
})