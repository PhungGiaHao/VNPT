/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {StatusBar} from 'react-native';

import {initializeApp} from './src/db/initDatabase';
import {DataProvider} from './src/hook';
import {AppStack} from './src/navigation/App';

function App(): JSX.Element {
  useEffect(() => {
    initializeApp();
  }, []);
  return (
    <DataProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <AppStack />
    </DataProvider>
  );
}

export default App;
