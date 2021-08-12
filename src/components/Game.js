import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

import RandomNumber from './RandomNumber'

const Game = ({ randomNumberCount }) => {

  const [selectedNumbers, setSelectedNumbers] = useState([0, 4])

  const propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  }

  const isNumberSelected = (index) => {
    return selectedNumbers.indexOf(index) >= 0
  }

  // TODO: Shuffle the random numbers.
  const randomNumbers = Array
    .from({ length: randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()))

  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

  const renderNumbers = () => {
    return randomNumbers.map((num, index) => {
      return <RandomNumber 
        key={index} 
        num={num} 
        isSelected={isNumberSelected(index)}
      />
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {renderNumbers()}
      </View>
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