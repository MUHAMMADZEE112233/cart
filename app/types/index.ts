export interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    colour: string; // Adjusted property name
}

export interface BasketItem extends Product {
    qtyInBag: number;
}
