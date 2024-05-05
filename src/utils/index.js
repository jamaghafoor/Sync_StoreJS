import { Dimensions, Platform } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const heightPercentage = (value) => {
  return (windowHeight / 100) * value;
};
export const widthPercentage = (value) => {
  return (windowWidth / 100) * value;
};
export const isIpad = Platform.isPad ? true : false;
export const hpHeight = hp;
export const wpWidth = wp;