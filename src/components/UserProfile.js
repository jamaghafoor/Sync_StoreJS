import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentage, isIpad, widthPercentage} from '../utils';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager, Profile} from 'react-native-fbsdk-next';
import DummyHotelsData from '../utils/Data.json';
import {useIsFocused} from '@react-navigation/native';

const UserProfile = ({navigation, route}) => {
  const isFocused = useIsFocused();

  let webClientID =
    '259932369552-gqhrdcru7v042u0gi6vuksmffm511cp4.apps.googleusercontent.com';
  let androidClientID =
    '259932369552-gmk2ae7f4pvkvccr5o9j4g0i1lhi51nh.apps.googleusercontent.com';
  let iosClientID =
    '259932369552-gmk2ae7f4pvkvccr5o9j4g0i1lhi51nh.apps.googleusercontent.com';

  useEffect(() => {
    (async () => {
      GoogleSignin.configure({
        webClientId: webClientID,
        androidClientId: androidClientID,
        iosClientId: iosClientID,
        scopes: ['profile', 'email'],
        offlineAccess: true,
      });
      await AsyncStorage.setItem('HotelsData', JSON.stringify(DummyHotelsData));
    })();
  }, [isFocused, navigation, route]);

  const handleGoogleSignIn = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn().then(async googleSignInRes => {
      console.log('googleSignInRes?.user: ', googleSignInRes?.user);
      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify(googleSignInRes?.user),
      );
      navigation.navigate('home');
    });
  };

  const handleFacebookignIn = async () => {
    await GoogleSignin.signOut();
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          Alert.alert('Alert:', 'Login cancelled!');
        } else {
          handleGetUserProfile();
        }
      },
      function (error) {
        Alert.alert('Login failed: ', error);
      },
    );
  };

  const handleGetUserProfile = async () => {
    await Profile.getCurrentProfile().then(async currentProfile => {
      if (currentProfile) {
        await AsyncStorage.setItem('userInfo', JSON.stringify(currentProfile));
        navigation.navigate('home');
      }
    });
  };

  const handlelogout = async () => {
    await LoginManager.logOut();
    await GoogleSignin.signOut();
  };

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingHorizontal: widthPercentage(25),
            paddingTop: heightPercentage(20),
          }}>
          <Pressable onPress={handleFacebookignIn}>
            <Image
              source={require('../../assets/face.png')}
              style={styles.activeImg}
            />
          </Pressable>
          <Pressable onPress={handlelogout}>
            <Image
              source={require('../../assets/x.png')}
              style={styles.activeImg}
            />
          </Pressable>
          <Pressable onPress={handleGoogleSignIn}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.activeImg}
            />
          </Pressable>
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
    height: isIpad ? heightPercentage(3) : heightPercentage(7),
    width: isIpad ? widthPercentage(5) : widthPercentage(13),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  gImg: {
    height: isIpad ? heightPercentage(3) : heightPercentage(5),
    width: isIpad ? widthPercentage(5) : widthPercentage(10),
    resizeMode: 'contain',
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: heightPercentage(3),
  },
});
