import { Product, BasketItem } from '../types';

export interface State {
    products: Product[];
    basket: BasketItem[];
    filter: string;
}

export const initialState: State = {
    products: [],
    basket: [],
    filter: 'all',
};

type Action =
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'ADD_TO_BASKET'; payload: number }
    | { type: 'INCREMENT_QTY'; payload: number }
    | { type: 'DECREMENT_QTY'; payload: number }
    | { type: 'REMOVE_FROM_BASKET'; payload: number }
    | { type: 'FILTER_BY_COLOR'; payload: string };

export const reducer = (state: State, action: Action): State => {
    console.log('Action Dispatched:', action);
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
        case 'ADD_TO_BASKET': {
            const item = state.basket.find(item => item.id === action.payload);
            if (item) {
                return {
                    ...state,
                    basket: state.basket.map(item =>
                        item.id === action.payload
                            ? { ...item, qtyInBag: item.qtyInBag + 1 }
                            : item
                    ),
                };
            } else {
                const product = state.products.find(p => p.id === action.payload);
                if (product) {
                    return {
                        ...state,
                        basket: [
                            ...state.basket,
                            { ...product, qtyInBag: 1 },
                        ],
                    };
                }
                return state;
            }
        }
        case 'INCREMENT_QTY':
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.id === action.payload
                        ? { ...item, qtyInBag: item.qtyInBag + 1 }
                        : item
                ),
            };
        case 'DECREMENT_QTY':
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.id === action.payload && item.qtyInBag > 1
                        ? { ...item, qtyInBag: item.qtyInBag - 1 }
                        : item
                ),
            };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.payload),
            };
        case 'FILTER_BY_COLOR':
            return {
                ...state,
                filter: action.payload,
            };
        default:
            return state;
    }
};
