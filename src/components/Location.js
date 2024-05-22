import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
  Alert,
  Dimensions,
  ImageBackground,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import MapboxGl from '@rnmapbox/maps';
import {heightPercentage, widthPercentage} from '../utils';
import TextField from './TextField';
import MapStyles from '../../assets/style.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import MapMarkers from "../utils/markersData.json"

const markerCount = 5;
// const centerCoord = ;
const allColors = ['red', 'green', 'blue', 'purple'];

const Location = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [markers, setMarkers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchor, setAnchor] = useState({x: 0.5, y: 0.5});
  const [allowOverlap, setAllowOverlap] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [centerCoord, setCenteredCoords] = useState([
    72.86718047737594, 19.07715994556233,
  ]);
  const flatRef = useRef(null);
  const [size, setSize] = useState(1);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const getData = async () => {
      try {
        let user = await AsyncStorage.getItem('userInfo');
        user = JSON.parse(user);
        console.log('User on Home page: ', user);
        if (user?.email) {
          Alert.alert(
            'Login Successfully!',
            `Name: ${user?.name}, Email: ${user?.email}`,
          );
        } else if (user?.userID) {
          Alert.alert(
            'Login Successfully!',
            `Name: ${user?.name}, User ID: ${user?.userID}`,
          );
        }
        await AsyncStorage.removeItem('userInfo');
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, [navigation]);

  const randomizeCoordinatesAndColors = useCallback(() => {
    const newMarkers = MapMarkers?.map((marker, i) => {
      return {
        ...marker,
        coords: [
          centerCoord[0] + (Math.random() - 0.6) * 0.015,
          centerCoord[1] + (Math.random() - 0.6) * 0.015,
        ],
        color: allColors[i % allColors.length]
      }
    });
    setMarkers(newMarkers);
    setSelectedItem(newMarkers[0]);
  }, []);

  useEffect(() => {
    MapboxGl.setTelemetryEnabled(false);
    randomizeCoordinatesAndColors();
  }, [centerCoord]);

  const scrollToIndex = index => {
    console.log('flatRef?.current: ', flatRef?.current);
  };

  const defaultStyle = {
    version: 8,
    // styles: ['mapbox://styles/sameerullas/clvw93wbf00yr01pc4c5tgwop'],
    name: 'Land',
    sources: {
      map: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        minzoom: 1,
        maxzoom: 10,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f2efea',
        },
      },
      {
        id: 'map',
        type: 'raster',
        source: 'map',
        paint: {
          'raster-fade-duration': 100,
        },
      },
    ],
  };

  const defaultCamera = {
    centerCoordinate: centerCoord,
    zoomLevel: 14,
  };

  const _viewabilityConfig = {
    minimumViewTime: 50,
    waitForInteraction: true,
    itemVisiblePercentThreshold: 80,
  };

  const onViewCallBack = React.useCallback(viewableItems => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (viewableItems?.viewableItems[0]?.isViewable) {
      setSelectedItem(viewableItems?.viewableItems[0]?.item);
    }

    // Use viewable items in state or as intended
  }, []);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.topCover}>
          <View style={styles.heading}>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
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
          {/* <View style={{marginTop: 30}}>
            <TextField
              placeholder="Search..."
              CustomeIcon={() => (
                <Image
                  style={{height: 18, width: 18, marginLeft: 10}}
                  resizeMode="contain"
                  source={require('../../assets/searchicon.png')}
                />
              )}
              // onSubmitEditing={Keyboard.dismiss}
              value={email}
              onChangeText={data => {
                setEmail(data);
                // onEmailUpdateFiled(data);
              }}
              mainContainerStyle={{backgroundColor: 'white'}}
              placeholderTextColor={'#ced7d5'}
            />
          </View> */}
        </View>
        <MapboxGl.MapView
          onPress={item => {
            console.log('Map pressed: ', item);
          }}
          style={styles.map}
          styleURL={MapboxGl.StyleURL.Light}
          zoomEnabled>
          <MapboxGl.Camera defaultSettings={defaultCamera} />
          {/* <MapboxGl.Style json={MapStyles} /> */}
          {markers.map((marker, i) => {
            return (
              <MapboxGl.MarkerView
                key={`MarkerView-${marker.coords.join('-')}`}
                coordinate={marker.coords}
                anchor={anchor}
                allowOverlap={allowOverlap}
                isSelected={marker?.id === selectedItem?.id}
                style={{display: 'flex'}}>
                <Pressable
                  style={[styles.markerBox]}
                  onPress={() => {
                    // setSelectedIndex(index => (index === i ? -1 : i));
                    // setSelectedHotel(marker);
                    // scrollToIndex(i)
                  }}>
                  <ImageBackground
                  resizeMode='contain'
                    source={
                      marker?.rating == 1
                        ? require(`../../assets/mark1.png`)
                        : marker?.rating == 2 ? require(`../../assets/mark2.png`)
                        : marker?.rating == 3 ? require(`../../assets/mark3.png`)
                        : require(`../../assets/mark4.png`)
                    }
                    style={[
                      selectedItem?.id == marker?.id
                        ? styles.selectedImg
                        : styles.heartImg1,
                    ]}>
                  </ImageBackground>
                </Pressable>
              </MapboxGl.MarkerView>
            );
          })}
        </MapboxGl.MapView>

        <View
          style={{
            position: 'absolute',
            bottom: heightPercentage(6),
            // flex: 1,
            zIndex: 99,
            width: widthPercentage(100),
            paddingVertical: 15,
            // borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            // alignSelf: "center",
            // backgroundColor: "white"
          }}>
          <Carousel
            layout={'default'}
            // ref={ref => (this.carousel = ref)}
            data={markers}
            style={{width: '100%'}}
            ref={ref => (flatRef.current = ref)}
            sliderWidth={widthPercentage(100)}
            viewabilityConfig={_viewabilityConfig}
            onViewableItemsChanged={onViewCallBack}
            itemWidth={widthPercentage(92)}
            // initialScrollIndex={1}
            // initialNumToRender={1}
            // onScrollToIndexFailed={() =>{

            // }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    paddingHorizontal: 12,
                    paddingVertical: 18,
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '60%',
                    }}>
                    <View style={styles.samImg}>
                      <Image
                        source={{uri: item?.image}}
                        style={styles.subImg}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          paddingLeft: 10,
                          letterSpacing: 0.6,
                          color: 'black',
                        }}>
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          paddingLeft: 10,
                          letterSpacing: 0.6,
                        }}>
                        {item?.location}
                      </Text>
                      <Text
                        style={{
                          color: '#439281',
                          fontSize: 18,
                          letterSpacing: 1,
                          paddingLeft: 10,
                          paddingTop: 5,
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
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      style={{fontSize: 12, color: '#ced7d5', paddingRight: 3}}>
                      {item?.rating?.toFixed(1)}
                    </Text>
                    <View style={styles.itemImg}>
                      <Image
                        source={require('../../assets/star.png')}
                        style={styles.subImg}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
            onSnapToItem={index => console.log('snapped')}
          />
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: heightPercentage(100),
    width: widthPercentage(100),
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  heading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  topCover: {
    position: 'absolute',
    zIndex: 99,
    width: widthPercentage(100),
    top: heightPercentage(6),
    paddingTop: Platform.OS == 'ios' ? 55 : 15,
    paddingHorizontal: 20,
  },
  headText: {
    color: '#333736',
    // fontWeight: "700",
    fontSize: Platform.isPad ? 18 : 16,
    // marginBottom: 40,
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(10),
    alignSelf: 'center',
  },
  heartImg1: {
    height: Platform.OS == 'ios' ? heightPercentage(7) : heightPercentage(7),
    width: Platform.OS == 'ios' ? widthPercentage(12) : widthPercentage(10),
    alignSelf: 'center',
    alignItems: 'center',
  },
  selectedImg: {
    height: Platform.OS == 'ios' ? heightPercentage(7) : heightPercentage(9.1),
    width: Platform.OS == 'ios' ? widthPercentage(12) : widthPercentage(14),
    alignSelf: 'center',
    alignItems: 'center',
  },
  samImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(10),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(19),
  },
  itemImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(1.7),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(3.5),
  },
  subImg: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  ratingTxt: {
    fontSize: 10,
    color: 'white',
    paddingLeft: 8,
    paddingTop: Platform.OS == 'ios' ? 8 : 6,
  },
  selectdTxt:{
    fontSize: 11,
    color: 'white',
    paddingLeft: 8,
    paddingTop: Platform.OS == 'ios' ? 8 : 9,
  }
});
