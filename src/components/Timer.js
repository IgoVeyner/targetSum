import React from 'react'
import { useState, useEffect } from 'react'
import { Text } from 'react-native'

const Timer = ({ initialSeconds, setGameStatus, calcGameStatus }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1)
    }, 1000)

    if (remainingSeconds === 0) {
      setGameStatus(calcGameStatus(true))
      clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
    };
  }, [remainingSeconds]);

  return (
    <Text>{remainingSeconds}</Text>
  )
}

export default Timer