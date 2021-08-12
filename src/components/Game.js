import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

import RandomNumber from './RandomNumber'

const Game = ({ randomNumbers, target }) => {

  const [selectedIds, setSelectedIds] = useState([])

  const propTypes = {
    randomNumbers: PropTypes.array.isRequired,
    target: PropTypes.number.isRequired,
  }

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
        isDisabled={isNumberSelected(index)}
        onPress={selectNumber}
      />
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {renderNumbers()}
      </View>
      <Text>{currentStatus}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "30px",
    backgroundColor: '#ddd',
    flex: 1
  },

  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
})

export default Game