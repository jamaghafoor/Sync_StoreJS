
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigator/app';
import { navigationRef } from './src/navigator/RootNavigation';
import MapboxGL from '@rnmapbox/maps';
import { Settings } from 'react-native-fbsdk-next';

Settings.setAppID("725605769779800");
Settings.initializeSDK();
MapboxGL.setWellKnownTileServer('mapbox');
MapboxGL.setAccessToken('pk.eyJ1Ijoic2FtZWVydWxsYXMiLCJhIjoiY2x2dnZhc3N4MjE0ZTJzbWc1bmphd2V6bSJ9.B9DZK9MyxJuvERdkguu5Uw');
function App() {
  return (
    <NavigationContainer ref={navigationRef}>
    <RootStack></RootStack>
    </NavigationContainer>
  );
}

export default App;