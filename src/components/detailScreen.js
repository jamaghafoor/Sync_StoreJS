import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Pressable,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentage, isIpad, widthPercentage} from '../utils';
import Rating from './Rating';
import Carousel from './Swipper';

const ProductDetails = ({navigation}) => {
  const [showMoreDetails, setShowMoreDteails] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/baack.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
        <Text style={[styles.headText, {textAlign: 'center'}]}>
          Hotel OverView
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/heart-out.png')}
            style={styles.heartOutImg}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1, height: '100%'}}>
        <View
          style={{
            // flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: widthPercentage(95),
            paddingTop: 10,
            paddingBottom: 15,
            borderRadius: 15,
            marginBottom: 20,
          }}>
          {/* <ImageBackground
            style={[
              {
                height: isIpad ? heightPercentage(10) : heightPercentage(30),
                width: isIpad ? widthPercentage(80) : widthPercentage(90),
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderRadius: 15,
                overflow: 'hidden',
              },
            ]}
            resizeMode="cover"
            source={require('../../assets/pro.png')}>
            <Image
              source={require('../../assets/slide.png')}
              resizeMode="contain"
              style={styles.playIcon}
            />
          </ImageBackground> */}
          <Carousel
            images={[
              require('../../assets/pro.png'),
              require('../../assets/sample.png'),
              require('../../assets/pro.png'),
            ]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <Rating maxSize={true} />
              <Text style={{fontSize: 13, paddingLeft: 7, color: '#ced7d5'}}>
                {'4.5'}
              </Text>
            </View>
            <Text style={{fontSize: 12}}></Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 18,
              color: 'black',
              paddingLeft: 15,
              paddingVertical: 5,
              letterSpacing: 1,
            }}>
            Bougainvillea Hotel
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <Image
              source={require('../../assets/map.png')}
              resizeMode="contain"
              style={stateStyles.mapImg}
            />
            <Text style={{fontSize: 13, letterSpacing: 1}}>
              429 N Bay Shore, Hawaii, USA
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#868989',
              width: '93%',
              height: 0.5,
              marginVertical: 15,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <Text style={styles.tab}>3 Guests</Text>
            <Text style={styles.tab}>1 Bedroom</Text>
            <Text style={styles.tab}>1 Queen Bed</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              paddingHorizontal: 15,
              marginTop: 15,
            }}>
            <Text style={styles.tab}>1 Baby Bed</Text>
            <Text style={styles.tab}>1 Bathroom</Text>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setShowMoreDteails(!showMoreDetails);
          }}>
          <View style={{paddingHorizontal: 15}}>
            <Text style={{fontSize: 13, letterSpacing: 0.9}}>
              Praesent pharetra nisi nec lectus consequat hotel gravid. Integer
              non risus non nibh porttitor dignissim.
            </Text>
            <View>
              {showMoreDetails && (
                <Text style={{fontSize: 13, letterSpacing: 0.9, marginTop: 10}}>
                  Praesent pharetra nisi nec lectus consequat hotel gravid.
                  Integer non risus non nibh porttitor dignissim.
                </Text>
              )}
              {showMoreDetails && (
                <Text style={{fontSize: 13, letterSpacing: 0.9, marginTop: 10}}>
                  Etiam lacinia porta magna, id tempor justo elementum ut. Donec
                  commodo ex sit amet consectetur pharetra. Cras ut tristique
                  eros, ac cursus juston. Praesent pharetra nisi nec lectus
                  consequat hotel gravid. Integer non risus non nibh porttitor
                  dignissim. Etiam lacinia porta magna, id tempor justo
                  elementum ut. Donec commodo ex sit amet consectetur pharetra.
                  Cras ut tristique eros, ac cursus juston. Praesent pharetra
                  nisi nec lectus consequat hotel gravid. Integer non risus non
                  nibh porttitor dignissim.
                </Text>
              )}
            </View>
            {!showMoreDetails && (
              <Text style={{fontSize: 13, letterSpacing: 0.9, marginTop: 10}}>
                Etiam lacinia porta magna, id tempor justo elementum ut. Donec
                commodo ex sit amet consectetur pharetra. Cras ut tristique
                eros, ac cursus justo…
                <Text style={styles.viewMore}>{' Read More'}</Text>
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <View>
            <Text style={{color: '#439281', fontSize: 25, letterSpacing: 1}}>
              $950{' '}
              <Text
                style={{
                  color: '#ced7d5',
                  fontWeight: '400',
                  fontSize: 14,
                  letterSpacing: 1,
                }}>
                /3 nights
              </Text>
            </Text>
            <Text style={{fontSize: 12, paddingTop: 3}}>19 July - 23 July</Text>
          </View>
          <TouchableOpacity 
          onPress={() => navigation.navigate("Details")}
          style={stateStyles.detailImg}>
            <Image
              source={require('../../assets/detail.png')}
              style={stateStyles.btnImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: "#000",
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    paddingTop: Platform.OS == 'ios' ? 55 : 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headText: {
    color: 'black',
    // fontWeight: "700",
    fontSize: Platform.isPad ? 18 : 16,
    // marginBottom: 40,
    letterSpacing: 1,
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(10),
    alignSelf: 'center',
  },
  heartOutImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(10),
    // backgroundColor : "red",
    // marginBottom: 40
  },
  playIcon: {
    height: heightPercentage(14),
    width: widthPercentage(20),
    marginBottom: -30,
    alignSelf: 'center',
    // marginLeft: 15,
  },
  tab: {
    backgroundColor: '#dfe7e5',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 14,
    fontSize: 13,
    marginRight: 15,
  },
  viewMore: {
    fontSize: 13,
    color: '#e67f44',
    paddingBottom: 5,
    paddingTop: 3,
  },
});

const stateStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  dropdown: {
    minHeight: isIpad ? 50 : 40,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 20,
    width: '47%',
    backgroundColor: '#f2f7f6',
  },
  icon: {
    marginRight: 12,
    color: 'gray',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: isIpad ? 24 : 16,
    color: '#9f9f9f',
    marginLeft: isIpad ? 20 : 15,
  },
  selectedTextStyle: {
    fontSize: isIpad ? 10 : 12.5,
    color: 'gray',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(6),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(8),
    alignSelf: 'center',
  },
  detailImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(10),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(50),
    borderRadius: 25,
  },
  btnImg: {
    height: '100%',
    width: '100%',
  },
  mapImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(2.8),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(3.8),
    alignSelf: 'center',
    marginRight: 5,
  },
});
