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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentage, isIpad, widthPercentage} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import TextField from './TextField';
import {Dropdown} from 'react-native-element-dropdown';
import Rating from './Rating';
import DummyHotelsData from '../utils/Data.json';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [selectedcountry, setSelectedCountry] = useState('');
  const [selectedguest, setseSectedGuest] = useState('');
  const [HotelsData, setHotelsData] = useState([]);
  const [likeState, setLikeState] = useState(false);


  // console.log("HotelsData: ", HotelsData);

  const isFocused = useIsFocused();

  const [slots, setSlots] = useState([
    {
      label: '12 July - 15 July',
      value: '12 July - 15 July',
    },
    {
      label: '16 July - 18 July',
      value: '16 July - 18 July',
    },
    {
      label: '19 July - 20 July',
      value: '19 July - 20 July',
    },
  ]);
  const [guest, setGuest] = useState([
    {
      label: '1 Guest',
      value: '1 Guest',
    },
    {
      label: '2 Guests',
      value: '2 Guests',
    },
    {
      label: '3 Guests',
      value: '3 Guests',
    },
    {
      label: '4 Guests',
      value: '4 Guests',
    },
    {
      label: '5 Guests',
      value: '5 Guests',
    },
  ]);

  console.log('HotelsData: ', HotelsData);

  useEffect(() => {
    (async () => {
      let allHotelsData = await AsyncStorage.getItem('HotelsData');
      let get_all_filters = await AsyncStorage.getItem('filters');
      get_all_filters = JSON.parse(get_all_filters);
      let allHotelsArr = JSON.parse(allHotelsData);
      let newData = await allHotelsArr.filter(item => {
        return (
          item.rate >= get_all_filters?.range &&
          item.rating >= get_all_filters?.rating &&
          item.bedrooms >= get_all_filters?.bedrooms &&
          item.distance <= get_all_filters?.sliderValue
        );
      });

      setHotelsData(newData);
    })();
  }, [navigation, isFocused, likeState]);



  const likeUnlikeHandle = async (id, type) => {
    
    let allHotelsData = await AsyncStorage.getItem('HotelsData');
    let allArr =  JSON.parse(allHotelsData)

    if (type == 'unlike') {
      allArr?.forEach(item => {
        if (item?.id == id) {
          item["like"] = false;
        }
      });
    } else{
      allArr?.forEach(item => {
        if (item?.id == id) {
          item["like"] = true;
        }
      });
    }
    await AsyncStorage.setItem('HotelsData', JSON.stringify(allArr));
    setLikeState(!likeState)

    
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../../assets/baack.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
        <Text style={[styles.headText, {textAlign: 'center'}]}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Image
            source={require('../../assets/filter.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 15,
              zIndex: 99,
              // marginTop: -50,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingBottom: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Dropdown
                mode={'auto'}
                style={[stateStyles.dropdown]}
                placeholderStyle={stateStyles.placeholderStyle}
                selectedTextStyle={stateStyles.selectedTextStyle}
                inputSearchStyle={stateStyles.inputSearchStyle}
                itemTextStyle={stateStyles.itemText}
                data={slots}
                autoScroll={false}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                value={selectedcountry}
                onChange={item => {
                  setSelectedCountry(item?.value);
                }}
                containerStyle={{marginBottom: 10}}
              />
              <Dropdown
                mode={'auto'}
                style={[stateStyles.dropdown]}
                itemTextStyle={stateStyles.itemText}
                placeholderStyle={stateStyles.placeholderStyle}
                selectedTextStyle={stateStyles.selectedTextStyle}
                inputSearchStyle={stateStyles.inputSearchStyle}
                data={guest}
                autoScroll={false}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                value={selectedguest}
                onChange={item => {
                  setseSectedGuest(item?.value);
                }}
                containerStyle={{marginBottom: 10}}
              />
            </View>
            <TextField
              placeholder="Location"
              CustomeIcon={() => (
                <Image
                  style={{height: 18, width: 18, marginLeft: 10}}
                  resizeMode="contain"
                  source={require('../../assets/map.png')}
                />
              )}
              // onSubmitEditing={Keyboard.dismiss}
              value={email}
              onChangeText={data => {
                setEmail(data);
                // onEmailUpdateFiled(data);
              }}
            />
            <TouchableOpacity
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 15,
                marginBottom: 10,
                height: 48,
                borderRadius: 30,
              }}>
              <Image
                source={require('../../assets/done.png')}
                style={{width: '100%', height: '100%', borderRadius: 30,}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, height: '100%', marginTop: 30}}>
          <FlatList
            data={HotelsData}
            style={{flex: 1}}
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}, index) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate('ProductDetails',{item})}
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    width: widthPercentage(100),
                    paddingVertical: 10,
                    borderRadius: 15,
                    marginBottom: 20,
                  }}>
                  <ImageBackground
                    style={[
                      {
                        height: isIpad
                          ? heightPercentage(10)
                          : heightPercentage(22),
                        width: isIpad
                          ? widthPercentage(80)
                          : widthPercentage(95),
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        borderRadius: 15,
                        overflow: 'hidden',
                      },
                    ]}
                    resizeMode="cover"
                    source={require('../../assets/pro.png')}>
                    {item?.like ? (
                      <TouchableOpacity
                        onPress={() =>
                          likeUnlikeHandle(item?.id, 'unlike')
                        }>
                        <Image
                          source={require('../../assets/like.png')}
                          resizeMode="contain"
                          style={styles.playIcon}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => likeUnlikeHandle(item?.id, 'like')}>
                        <Image
                          source={require('../../assets/unlike.png')}
                          resizeMode="contain"
                          style={styles.playIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingHorizontal: 15,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Rating
                        rating={item?.rating}
                        total={5}
                        size={13}
                        color={'yellow'}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          paddingLeft: 7,
                          color: '#ced7d5',
                        }}>
                        {item?.rating}
                      </Text>
                    </View>
                    <Text style={{fontSize: 12}}>244 Reviews</Text>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 15,
                      color: 'black',
                      paddingLeft: 15,
                      paddingVertical: 5,
                      letterSpacing: 1,
                    }}>
                    {item?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        color: '#439281',
                        fontSize: 18,
                        letterSpacing: 1,
                      }}>
                      ${item?.rate}
                      <Text
                        style={{
                          color: '#ced7d5',
                          fontWeight: '400',
                          fontSize: 14,
                        }}>
                        /night
                      </Text>
                    </Text>

                    <View
                      style={{borderRadius: 20, backgroundColor: '#c7d1cf'}}>
                      <Feather
                        name="arrow-right"
                        color={'#ffffff'}
                        size={isIpad ? 30 : 20}
                        style={{padding: 5}}
                      />
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

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
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(10),
    alignSelf: 'center',
  },
  playIcon: {
    height: heightPercentage(14),
    width: widthPercentage(8),
    alignSelf: 'flex-start',
    marginTop: -25,
    marginLeft: 15,
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
  itemText:{
    fontSize: isIpad ? 20 : 14,
    color: '#9f9f9f',
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
});
