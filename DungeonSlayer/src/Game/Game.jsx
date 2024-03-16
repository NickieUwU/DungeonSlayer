import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";
import BlockImage from "../Sprites/Block.png";
import PlayerImage from "../Sprites/Player.png";
import EnemyImage from "../Sprites/Enemy.png";
import PlayerAttackImage from "../Sprites/PlayerAttackImage.png"

function Game() {
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [blocks, setBlocks] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [playerState, setPlayerState] = useState(PlayerImage);

    useEffect(() => {
        const enemies = [
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
        ];
        setEnemies(enemies);
    }, []);

    useEffect(() => {
        // Update with actual block positions
        const blocks = [
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
        ];
        setBlocks(blocks);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Update player position based on arrow key presses
            switch (event.key) {
                case 'ArrowUp':
                    attemptMovePlayer({ x: playerPosition.x, y: playerPosition.y - 1 });
                break;
                case 'ArrowDown':
                    attemptMovePlayer({ x: playerPosition.x, y: playerPosition.y + 1 });
                break;
                case 'ArrowLeft':
                    attemptMovePlayer({ x: playerPosition.x - 1, y: playerPosition.y });
                break;
                case 'ArrowRight':
                    attemptMovePlayer({ x: playerPosition.x + 1, y: playerPosition.y });
                break;
                case 'a':
                    setPlayerState(PlayerAttackImage);
                    setTimeout(() => setPlayerState(PlayerImage), 1000); // Revert to original sprite after 1 second
                break;
                default:
                break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerPosition]); // Dependency array includes playerPosition

    const attemptMovePlayer = (newPosition) => {
        if (
            newPosition.x >= 0 &&
            newPosition.y >= 0 &&
            newPosition.x < 25 && // Adjust this based on your game's width
            newPosition.y < 25 // Adjust this based on your game's height
        ) {
            // Round the positions to integers for accurate comparison
            const roundedPlayerPosition = { x: Math.round(newPosition.x), y: Math.round(newPosition.y) };
            // Check if the new position collides with any block
            const isColliding = blocks.some((block) => block.x === roundedPlayerPosition.x && block.y === roundedPlayerPosition.y);
            if (!isColliding) {
                // If no collision, update player position
                setPlayerPosition(newPosition);
            }
            const EnemyCollision = enemies.some((enemy) => enemy.x === roundedPlayerPosition.x &&  enemy.y === roundedPlayerPosition.y);
        if(EnemyCollision)
        {
            if(playerState === PlayerAttackImage)
            {
                enemies.pop((enemy) => enemy.x === roundedPlayerPosition.x &&  enemy.y === roundedPlayerPosition.y);
            }
            else
            {
                location.reload();
            }
        }
        }
    };

    return (
        <>
            {blocks.map((block, index) => (
                <img
                    key={index}
                    src={BlockImage}
                    alt={`Block-${index}`}
                    className={styles.BlockImage}
                    style={{ top: `${block.y * 50}px`, left: `${block.x * 50}px` }}
                />
            ))}
            {enemies.map((enemy, index) => ( // Added return here
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
