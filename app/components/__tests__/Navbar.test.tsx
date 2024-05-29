import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../navbar/Navbar';

// Mock state for testing
interface State {
    basket: { id: number; name: string; price: number }[];
}

const mockStateWithEmptyBasket: State = { basket: [] };
const mockStateWithOneItem: State = {
    basket: [{ id: 1, name: 'Test Product', price: 10 }],
};

test('renders navbar with logo and no items in cart', () => {
    render(<Navbar state={mockStateWithEmptyBasket} />);
    expect(screen.getByRole('heading')).toHaveTextContent('My Fasion');
    expect(screen.getByAltText('cart')).toBeInTheDocument();
    expect(screen.queryByText(/items/i)).not.toBeInTheDocument(); // Check item count is NOT rendered
});

test('renders navbar with logo and item count when basket is not empty', () => {
    render(<Navbar state={mockStateWithOneItem} />);
    expect(screen.getByRole('heading')).toHaveTextContent('My Fasion');
    expect(screen.getByAltText('cart')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Check item count is rendered
});

