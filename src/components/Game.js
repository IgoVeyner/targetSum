import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Game = () => {
  const target = 10 + Math.floor(40 * Math.random())

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
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
    marginHorizontal: 50,
    textAlign: 'center',
  },
})

export default Game