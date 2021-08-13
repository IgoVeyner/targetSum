import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useState, useEffect } from 'react'

import RandomNumber from './RandomNumber'
import Timer from './Timer'

const Game = ({ randomNumbers, target, initialSeconds, onPlayAgain }) => {

  const [selectedIds, setSelectedIds] = useState([])
  const [gameStatus, setGameStatus] = useState("PLAYING")

  const propTypes = {
    randomNumbers: PropTypes.array.isRequired,
    target: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  }

  const isNumberSelected = (index) => {
    return selectedIds.indexOf(index) >= 0
  }

  const setNewGameStatus = () => {
    setGameStatus(calcGameStatus())
  }

  const selectNumber = (index) => {
    setSelectedIds(() => [...selectedIds, index])
  }

  const calcGameStatus = (timerOver = false) => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr]
    }, 0)

    if (timerOver) {
      return "LOST"
    }
    if (sumSelected < target) {
      return 'PLAYING'
    }
    if (sumSelected === target) {
      return "WON"
    }
    if (sumSelected > target) {
      return "LOST"
    }
  }

  const renderNumbers = () => {
    return randomNumbers.map((num, index) => {
      return <RandomNumber 
        key={index} 
        id={index}
        num={num} 
        isDisabled={
          isNumberSelected(index) || gameStatus !== "PLAYING"
        }
        onPress={selectNumber}
      />
    })
  }

  useEffect(() => {
    setNewGameStatus()
  }, [selectedIds]);

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {renderNumbers()}
      </View>
      {gameStatus !== "PLAYING" && (
        <Button title="Play Again" onPress={onPlayAgain} />
      )}
      <Timer 
        initialSeconds={initialSeconds} 
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        calcGameStatus={calcGameStatus}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "30px",
    backgroundColor: '#ddd',
    flex: 1,
  },

  target: {
    fontSize: 40,
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  } 
})

export default Game