import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const RandomNumber = ({ num, isSelected }) => {

  const propTypes = {
    number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  const handlePress = () => {
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isSelected && styles.selected]}>{num}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    height: 50,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },

  selected: {
    opacity: 0.3
  }
})

export default RandomNumber