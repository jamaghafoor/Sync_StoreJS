import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {heightPercentage, isIpad, widthPercentage} from '../utils';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const Carousel = ({style, images, ...otherProps}) => {
  // console.log("images---",images)
  return (
    <View style={styles.container}>
      <SwiperFlatList
        //   style={StyleSheet.flatten([styles.wrapper])}
        paginationStyleItem={{
            marginHorizontal: 5
        }}
        paginationStyleItemActive={{
         width: 15,
         height: 5
        }}
        paginationStyleItemInactive={{
            width: 15,
            height: 5
           }}
        index={0}
        showPagination
        paginationActiveColor={'#e67f44'}
        paginationDefaultColor={'white'}>
        {images?.map((item, index) => (
          <Image
            key={index + 1}
            source={item}
            resizeMode={'cover'}
            style={styles.child}
          />
        ))}
      </SwiperFlatList>
    </View>
  );
};

Carousel.defaultProps = {
  style: null,
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', marginHorizontal: 10},
  child: {
    height: isIpad ? heightPercentage(10) : heightPercentage(30),
    width: isIpad ? widthPercentage(80) : widthPercentage(90),
    borderRadius: 20,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  wrapper: {
    height: isIpad ? heightPercentage(10) : heightPercentage(30),
    width: isIpad ? widthPercentage(80) : widthPercentage(90),

    // height: "100%",
  },
  slide: {
    // flex: 1,
    // marginHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 10,
    height: isIpad ? heightPercentage(10) : heightPercentage(30),
    width: isIpad ? widthPercentage(80) : widthPercentage(90),
  },
});
export default Carousel;
