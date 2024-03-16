import styles from "./HowToPlay.module.css";

function HowToPlay()
{
    return(
        <>
            <div className={styles.FullHowToPlay}>
                <focus>
                    <h1 align="center">How to play?</h1>
                    <h2 align="Center">Player</h2>
                    <img src="../Sprites/Player.png" alt="Player"/>
                    <div>
                        <h3 align="center">
                            Movement   
                        </h3><br/>
                        Use the arrow keys or WASD to move your character.
                    </div>
                </focus>
            </div>
        </>
    );
}

export default HowToPlay;