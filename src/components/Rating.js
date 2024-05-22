import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 6,
  },
});

const Rating = ({ size, rating, total, textColor, style, color }) => (
  <View style={[styles.starsContainer, style]}>
    {[{},{},{},{},{}].map((item, index) => {
      const fill =( rating - index) - 1;
      const isFill = fill >= 0;
      return (
        <Icon
          key={index+1}
          name={"star"}
          color={isFill ? color || "#e67f44" : "#ced7d5"}
          size={size}
        />
      );
    })}
  </View>
);


export default Rating;
