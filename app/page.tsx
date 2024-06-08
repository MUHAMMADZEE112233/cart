"use client";
import { useEffect, useReducer } from "react";
import { fetchProducts } from "./services/productService";
import { reducer, initialState } from "./state/reducer";
import ProductList from "./components/productList";
import React from "react";
import Navbar from "./components/navbar/Navbar";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      dispatch({ type: "SET_PRODUCTS", payload: products });
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log("State Updated:", state);
  }, [state]);

  return (
    <>
      <Navbar state={state} />
      <ProductList
        products={state.products}
        basket={state.basket}
        filter={state.filter}
        addToBasket={(id) => dispatch({ type: "ADD_TO_BASKET", payload: id })}
        incrementQty={(id) => dispatch({ type: "INCREMENT_QTY", payload: id })}
        decrementQty={(id) => dispatch({ type: "DECREMENT_QTY", payload: id })}
        removeFromBasket={(id) =>
          dispatch({ type: "REMOVE_FROM_BASKET", payload: id })
        }
        filterByColor={(color) =>
          dispatch({ type: "FILTER_BY_COLOR", payload: color })
        }
      />
    
    </>
  );
};

export default Home;
