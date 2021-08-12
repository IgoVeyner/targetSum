import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const RandomNumber = ({ num, id, isDisabled, onPress }) => {

  const propTypes = {
    num: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  const handlePress = () => {
    if (isDisabled) { return }
    onPress(id)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.selected]}>{num}</Text>
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