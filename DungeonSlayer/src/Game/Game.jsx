import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";
import BlockImage from "../Sprites/Block.png";
import PlayerImage from "../Sprites/Player.png";
import EnemyImage from "../Sprites/Enemy.png";
import PlayerAttackImage from "../Sprites/PlayerAttackImage.png";

function Game() {
    const [level, setLevel] = useState(1);
    const [kills, setKills] = useState(0);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [blocks, setBlocks] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [playerState, setPlayerState] = useState(PlayerImage);

    useEffect(() => {
        const newBlocks = Array.from({ length: 8 }, () => ({
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        }));
        setBlocks(newBlocks);
    }, [level]);

    useEffect(() => {
        const newEnemies = Array.from({ length: level }, () => ({
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }));
        setEnemies(newEnemies);
    }, [level]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    attemptMovePlayer({ x: playerPosition.x, y: playerPosition.y - 1 });
                    break;
                case "ArrowDown":
                    attemptMovePlayer({ x: playerPosition.x, y: playerPosition.y + 1 });
                    break;
                case "ArrowLeft":
                    attemptMovePlayer({ x: playerPosition.x - 1, y: playerPosition.y });
                    break;
                case "ArrowRight":
                    attemptMovePlayer({ x: playerPosition.x + 1, y: playerPosition.y });
                    break;
                case "a":
                    setPlayerState(PlayerAttackImage);
                    setTimeout(() => setPlayerState(PlayerImage), 1000);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [playerPosition]); // Dependency array includes playerPosition

    useEffect(() => {
        // Move enemies towards the player
        const interval = setInterval(() => {
            setEnemies((prevEnemies) => {
                return prevEnemies.map((enemy) => {
                    let dx = playerPosition.x - enemy.x;
                    let dy = playerPosition.y - enemy.y;
                    // Adjust enemy position towards the player
                    if (Math.abs(dx) > Math.abs(dy)) {
                        enemy.x += dx > 0 ? 1 : -1;
                    } else {
                        enemy.y += dy > 0 ? 1 : -1;
                    }
                    return enemy;
                });
            });
        }, 400); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [playerPosition]); // Dependency array includes playerPosition

    const attemptMovePlayer = (newPosition) => {
        if (
            newPosition.x >= 0 &&
            newPosition.y >= 1 &&
            newPosition.x < 20 && // Adjust this based on your game's width
            newPosition.y < 20 // Adjust this based on your game's height
        ) {
            const roundedPlayerPosition = { x: Math.round(newPosition.x), y: Math.round(newPosition.y) };
            const isColliding = blocks.some((block) => block.x === roundedPlayerPosition.x && block.y === roundedPlayerPosition.y);
            if (!isColliding) {
                setPlayerPosition(newPosition);
            }
            const enemyIndex = enemies.findIndex((enemy) => enemy.x === roundedPlayerPosition.x && enemy.y === roundedPlayerPosition.y);
            if (enemyIndex !== -1) {
                if (playerState === PlayerAttackImage) {
                    const newEnemies = [...enemies];
                    newEnemies.splice(enemyIndex, 1);
                    setEnemies(newEnemies);
                    setKills((prevKills) => prevKills + 1);
                    if (newEnemies.length === 0) {
                        setLevel((prevLevel) => prevLevel + 1);
                    }
                } 
                else 
                {
                    setLevel(1);
                    setKills(0);
                }
            }
        }
    };

    return (
        <>
            <div className={styles.Counter}>
                level: {level} kills: {kills}
            </div>
            {blocks.map((block, index) => (
                <img
                    key={index}
                    src={BlockImage}
                    alt={`Block-${index}`}
                    className={styles.BlockImage}
                    style={{ top: `${block.y * 50}px`, left: `${block.x * 50}px` }}
                />
            ))}
            {enemies.map((enemy, index) => (
                <img
                    key={index}
                    src={EnemyImage}
                    alt={`Enemy-${index}`}
                    className={styles.EnemyImage}
                    style={{ top: `${enemy.y * 50}px`, left: `${enemy.x * 50}px` }}
                />
            ))}
            <img
                src={playerState}
                alt="Player"
                className={styles.PlayerImage}
                style={{ top: `${playerPosition.y * 50}px`, left: `${playerPosition.x * 50}px` }}
            />
        </>
    );
}

export default Game;
