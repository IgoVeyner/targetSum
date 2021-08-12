import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

import RandomNumber from './RandomNumber'

const Game = ({ randomNumbers, target, initialSeconds }) => {

  const [selectedIds, setSelectedIds] = useState([])
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)

  const propTypes = {
    randomNumbers: PropTypes.array.isRequired,
    target: PropTypes.number.isRequired,
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1)
    }, 1000)

    if (remainingSeconds === 0) {
      clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
    };
  }, [remainingSeconds]);

  const isNumberSelected = (index) => {
    return selectedIds.indexOf(index) >= 0
  }

  const selectNumber = (index) => {
    setSelectedIds(() => [...selectedIds, index])
  }

  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr]
    }, 0)

    if (remainingSeconds === 0) {
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

  const currentStatus = gameStatus()

  const renderNumbers = () => {
    return randomNumbers.map((num, index) => {
      return <RandomNumber 
        key={index} 
        id={index}
        num={num} 
        isDisabled={
          isNumberSelected(index) || currentStatus !== "PLAYING"
        }
        onPress={selectNumber}
      />
    })
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${currentStatus}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {renderNumbers()}
      </View>
      <Text>{remainingSeconds}</Text>
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