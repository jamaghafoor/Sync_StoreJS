import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from  "../tabs";
import ProductDetails from "../../components/detailScreen";
import Filters from "../../components/Filters";
import Details from "../../components/Details";

const Stack = createNativeStackNavigator();

const RootStack = ({ navigation }) => {

  return (
            <Stack.Navigator
              mode="modal"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Tabs" component={Tabs} /> 
              <Stack.Screen name="ProductDetails" component={ProductDetails} />    
              <Stack.Screen name="Filters" component={Filters} /> 
          
       
          
            </Stack.Navigator>
    )
};

export default RootStack;
