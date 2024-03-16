import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import styles from "./Menu.module.css";
import Game from "../Game/Game";
import HowToPlay from "../HowToPlay/HowToPlay"

function Menu() {
  return (
      <div className={styles.MenuDiv}>
        <h1>Menu</h1>
        <br />
        <Link to="/Game">
          <button>play</button>
        </Link>
        <br />
        <Link to="/HowToPlay">
          <button>how to play</button>
        </Link>
        <br />
      </div>
  );
}

export default Menu;
