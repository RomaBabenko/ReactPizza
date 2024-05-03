import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Кошик порожній <icon>😥</icon>{" "}
        </h2>
        <p>
          Ваш кошик порожній. <br />
          Для замовлення піци перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
