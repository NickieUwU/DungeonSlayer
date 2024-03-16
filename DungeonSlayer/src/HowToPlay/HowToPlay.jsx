import styles from "./HowToPlay.module.css";
import PlayerImage from "../Sprites/Player.png";
import EnemyImage from "../Sprites/Enemy.png";
import { Link } from "react-router-dom";

function HowToPlay()
{
    return(
        <>
            <div className={styles.FullHowToPlay}>
                <main>
                    <h1 align="center">How to play?</h1>
                    <h2 align="center">Player</h2>
                    <img src={PlayerImage} alt="Player" align="center" className={styles.imgGuide}/>
                    <div>
                        <h3 align="center">
                            Movement   
                        </h3><br/>
                        <span className={styles.GuideText}>
                            Use the arrow keys or WASD to move your character.
                        </span>
                    </div>
                    <div>
                        <h3 align="center">
                            Attack
                        </h3><br/>
                        <span className={styles.GuideText}>
                            Press k to use your sword to attack
                        </span>
                    </div>
                    <h2 align="center">Enemies</h2>
                    <img src={EnemyImage} alt="Enemy" className={styles.imgGuide}/><br/>
                    <span className={styles.GuideText}>
                        Kill the enemy before they kill you!
                    </span>
                </main>
                <div align="center">
                    <Link to="/">
                        <button className={styles.btnMenu}>Menu</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default HowToPlay;