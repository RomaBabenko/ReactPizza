import React from "react";
import styles from "../scss/components/NotFound.module.scss";

export const NotFound = () => {
  return (
    <>
      <div className={styles.notFound__block}>
        <p>😥</p>
        <h1 className={styles.notFound__title}>Упсс...</h1>
        <h2 className={styles.notFound__title}>Hічого не знайдено</h2>
      </div>
    </>
  );
};

export default NotFound;
