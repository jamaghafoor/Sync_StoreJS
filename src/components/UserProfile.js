import {View, Text, StyleSheet, Platform, StatusBar, Image} from 'react-native';
import React from 'react';
import {heightPercentage, isIpad, widthPercentage} from '../utils';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        s
        backgroundColor={'#439281'}
      />
      <View style={styles.heading}>
        <Text style={[styles.headText, {textAlign: 'center'}]}>Sign in</Text>
      </View>
      <View
        style={{
          flex: 1,
          zIndex: 99,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          top: -30,
        }}>
        <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-evenly", paddingHorizontal: widthPercentage(25), paddingTop: heightPercentage(20)}}>
          <Image
            source={require('../../assets/face.png')}
            style={styles.activeImg}
          />
          <Image
            source={require('../../assets/x.png')}
            style={styles.activeImg}
          />
          <Image
            source={require('../../assets/g.png')}
            style={styles.gImg}
          />
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#439281',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    height: heightPercentage(25),
    paddingTop: Platform.OS == 'ios' ? 55 : 15,
    paddingBottom: 15,
    paddingHorizontal: 20,

  },
  headText: {
    color: 'white',
    fontWeight: '700',
    fontSize: Platform.isPad ? 18 : 27,
    letterSpacing: 1,
  },
  activeImg: {
    height: isIpad ? heightPercentage(3) : heightPercentage(6),
    width: isIpad ? widthPercentage(5) : widthPercentage(10),
    resizeMode: "contain",
    alignSelf: "center",
  },
  gImg: {
    height: isIpad ? heightPercentage(3) : heightPercentage(5),
    width: isIpad ? widthPercentage(5) : widthPercentage(10),
    resizeMode: "contain",
    alignSelf: "center",
    borderColor: "gray",
    borderRadius: heightPercentage(3),
  }
});
