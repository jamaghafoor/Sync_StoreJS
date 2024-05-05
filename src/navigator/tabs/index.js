import React, { useEffect, useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Location from "../../components/Location";
import Search from "../../components/Search";
import Favourite from "../../components/Favourite";
import UserProfile from "../../components/UserProfile";
import { heightPercentage, hpHeight, isIpad, widthPercentage } from "../../utils";
import SearchStack from "./searchTab";
const Tab = createBottomTabNavigator();

export default function App({ params, route }) {


  return (
    <Tab.Navigator
      initialRouteName={"profile"}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: isIpad ? hpHeight(8) : hpHeight(8),
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={require("../../../assets/location-checked.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                source={require("../../../assets/location.png")}
                style={styles.activeImg}
              />
            ),
        }}
        component={Location}
      />
      <Tab.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={require("../../../assets/search-checked.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                source={require("../../../assets/search.png")}
                style={styles.activeImg}
              />
            ),
        }}
        component={SearchStack}
      />
    
      <Tab.Screen
        name="favourite"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={require("../../../assets/heart-checked.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                source={require("../../../assets/heart.png")}
                style={styles.activeImg}
              />
            ),
        }}
        component={Favourite}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Image
                source={require("../../../assets/profile-checked.png")}
                style={styles.activeImg}
              />
            ) : (
              <Image
                source={require("../../../assets/profile.png")}
                style={styles.activeImg}
              />
            ),
        }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },

  activeImg: {
    height: isIpad ? heightPercentage(3) : heightPercentage(2.8),
    width: isIpad ? widthPercentage(5) : widthPercentage(6),
    resizeMode: "contain",
    alignSelf: "center",
  }
});
