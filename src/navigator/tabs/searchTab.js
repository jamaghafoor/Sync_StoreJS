import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../../components/Search';
import Details from '../../components/Details';

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="Details" component={Details} />           

    </Stack.Navigator>
  );
}

export default SearchStack;
