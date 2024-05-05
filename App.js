
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigator/app';
import { navigationRef } from './src/navigator/RootNavigation';
function App() {
  return (
    <NavigationContainer ref={navigationRef}>
    <RootStack></RootStack>
    </NavigationContainer>
  );
}

export default App;