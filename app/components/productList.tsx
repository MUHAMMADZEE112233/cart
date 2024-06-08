import React from "react";
import { Product, BasketItem } from "../types";
import styles from "./productList.module.css"; // Import CSS module
import { Badge, Button, Col, Image, Row, Select, Tag } from "antd";

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
        <h2 >Cart Items</h2>
        {basket.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          <div>
            <ul>
              {basket.map((item) => (
                <li key={item.id} style={{ marginTop: '5px' }}>
                  {item.name} <Tag color="green"> total items = {item.qtyInBag} x ${item.price} = $
                    {item.qtyInBag * item.price}</Tag>
                </li>
              ))}
            </ul>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
          </div>
        )}
      </div>
      <h1 style={{ textAlign: 'center' }}>New Arivals</h1>
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
      <Row gutter={[12, 24]}>
        {filteredProducts.map((product) => {
          const itemInBasket = basket.find((item) => item.id === product.id);
          return (
            <Col span={24} key={product.id} >
              <Badge.Ribbon text="Best selling" color="magenta">
                <div className={styles.item}>
                  <div className={styles["product-image"]}>
                    <Image src={product.img} alt={product.name} className="prodImg" />
                  </div>
                  <div className={styles["product-details"]}>
                    <h3>{product.name}</h3>
                    <p>Color: <Tag color={product.colour} style={{ color: product.colour === "Stone" && '#000' }}> {product.colour}</Tag></p>
                    <p>Price: ${product.price}</p>
                  </div>
                  <div className={styles["product-actions"]}>
                    <Button color="green" onClick={() => addToBasket(product.id)}>
                      Add to Cart
                    </Button>
                    {itemInBasket && (
                      <div className={styles["basket-controls"]}>
                        <Button onClick={() => decrementQty(product.id)}>-</Button>
                        <Button disabled>{itemInBasket.qtyInBag}</Button>
                        <Button onClick={() => incrementQty(product.id)}>+</Button>
                        <Button danger onClick={() => removeFromBasket(product.id)}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProductList;
