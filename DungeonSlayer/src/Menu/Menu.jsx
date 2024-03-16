import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <>
      <div className={styles.MenuDiv}>
        <h1>Menu</h1><br/>
      </div>
      <div className={styles.NavMenu}>
            <Link to="/Game">
            <button className={styles.btnMenu}>play</button>
            </Link>
            <br />
            <Link to="/HowToPlay">
            <button className={styles.btnMenu}>how to play</button>
            </Link>
      </div>
    </>
  );
}

export default Menu;
