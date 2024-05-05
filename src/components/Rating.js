import React from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import { heightPercentage, widthPercentage } from '../utils';

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
  },
  total: {
    marginLeft: 5,
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(3.7),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(3.7),
    alignSelf: 'center',
    marginLeft:2
  },
  heartImg2: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(4),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(4),
    alignSelf: 'center',
    marginLeft:2
  },
});

const Rating = ({size, rating, total, textColor, style, color, maxSize}) => (
  <View style={[styles.starsContainer]}>
    {[{}, {}, {}, {}, {}].map(index => {
      return (
        <Image
        // key={index+1}
          source={require('../../assets/star.png')}
          resizeMode="contain"
          style={maxSize ? styles.heartImg2 : styles.heartImg}
        />
      );
    })}
  </View>
);

Rating.defaultProps = {
  total: null,
  textColor: 'gray75',
  size: 18,
  style: null,
};

export default Rating;
