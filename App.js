import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Game from './src/components/Game';
import { useState } from 'react'

export default function App() {

  const [gameId, setGameId] = useState(1)

  const resetGame = () => {
    setGameId(gameId + 1)
  }

  const randomNumberCount = 6

  const randomNumbers = Array
    .from({ length: randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()))

  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

  const shuffledRandomNumbers = randomNumbers.sort(() => Math.random() - 0.5)

  return (
    <>
      <StatusBar style="auto" />
      <Game 
        randomNumbers={shuffledRandomNumbers} 
        target={target}
        initialSeconds={10}
        key={gameId}
        onPlayAgain={resetGame}
        />
    </>
  );
}