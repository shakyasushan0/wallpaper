/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from './src/context/ThemeContext';
import RootNavigator from './src/navigators/RootNavigator';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <StatusBar hidden />
        <RootNavigator />
      </ThemeProvider>
    </>
  );
};

export default App;
