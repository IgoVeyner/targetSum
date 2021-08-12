import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Game from './src/components/Game';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Game randomNumberCount={6}/>
    </>
  );
}