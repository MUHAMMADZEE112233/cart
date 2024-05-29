"use client";
import React, { useReducer } from "react";
import Cart from "../../../public/cart.png";
import Image from "next/image";
import styles from "./navbar.module.css";
import { State, initialState, reducer } from "../../state/reducer";
type NavProps = {
  state: State;
};
const Navbar = ({ state }: NavProps) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className={styles?.navbar}>
      <h2>My Fasion</h2>
      <div className={styles?.rightCart}>
        <Image src={Cart} alt="cart" className={styles?.cartImage} />
        <p className={state?.basket?.length > 0 && styles?.itemCount}>
          {state?.basket?.length > 0 && state?.basket?.length}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
