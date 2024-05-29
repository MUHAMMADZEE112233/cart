import React from "react";
import { Product, BasketItem } from "../types";
import styles from "./productList.module.css"; // Import CSS module

interface Props {
  products: Product[];
  basket: BasketItem[];
  filter: string;
  addToBasket: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeFromBasket: (id: number) => void;
  filterByColor: (color: string) => void;
}

const ProductList: React.FC<Props> = ({
  products,
  basket,
  filter,
  addToBasket,
  incrementQty,
  decrementQty,
  removeFromBasket,
  filterByColor,
}) => {
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.colour === filter);

  const totalAmount = basket.reduce(
    (total, item) => total + item.qtyInBag * item.price,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.basket}>
        <h2>Basket</h2>
        {basket.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          <div>
            <ul>
              {basket.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.qtyInBag} x ${item.price} = $
                  {item.qtyInBag * item.price}
                </li>
              ))}
            </ul>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
          </div>
        )}
      </div>
      <h1>Product Listings</h1>
      <div className={styles.filter}>
        <label>Filter by color: </label>
        <select onChange={(e) => filterByColor(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="Black">Black</option>
          <option value="Stone">Stone</option>
          <option value="Red">Red</option>
          {/* Add more colors if needed */}
        </select>
      </div>
      <div className={styles["product-list"]}>
        {filteredProducts.map((product) => {
          const itemInBasket = basket.find((item) => item.id === product.id);
          return (
            <div key={product.id} className={styles["product-item"]}>
              <div className={styles["product-image"]}>
                <img src={product.img} alt={product.name} />
              </div>
              <div className={styles["product-details"]}>
                <h2>{product.name}</h2>
                <p>Color: {product.colour}</p>
                <p>Price: ${product.price}</p>
              </div>
              <div className={styles["product-actions"]}>
                <button onClick={() => addToBasket(product.id)}>
                  Add to Cart
                </button>
                {itemInBasket && (
                  <div className={styles["basket-controls"]}>
                    <button onClick={() => decrementQty(product.id)}>-</button>
                    <span>{itemInBasket.qtyInBag}</span>
                    <button onClick={() => incrementQty(product.id)}>+</button>
                    <button onClick={() => removeFromBasket(product.id)}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
