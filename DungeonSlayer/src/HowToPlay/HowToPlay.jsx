import styles from "./HowToPlay.module.css";
import PlayerImage from "../Sprites/Player.png";
import EnemyImage from "../Sprites/Enemy.png";

function HowToPlay()
{
    return(
        <>
            <div className={styles.FullHowToPlay}>
                <focus>
                    <h1 align="center">How to play?</h1>
                    <h2 align="center">Player</h2>
                    <img src={PlayerImage} alt="Player" align="center"/>
                    <div>
                        <h3 align="center">
                            Movement   
                        </h3><br/>
                        <span>
                            Use the arrow keys or WASD to move your character.
                        </span>
                    </div>
                    <div>
                        <h3 align="center">
                            Attack
                        </h3><br/>
                        <span>
                            Press k to use your sword to attack
                        </span>
                    </div>
                    <h2 align="center">Enemies</h2>
                    <img src={EnemyImage} alt="Enemy"/><br/>
                    <span>
                        Kill the enemy before they kill you!
                    </span>
                </focus>
            </div>
        </>
    );
}

export default HowToPlay;