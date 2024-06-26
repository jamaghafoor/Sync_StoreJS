import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  ScrollView,
  UIManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentage, isIpad, widthPercentage} from '../utils';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Slider} from '@miblanchard/react-native-slider';
// import DummyData from '../utils/Data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const Filters = ({navigation}) => {
  const [bedrooms, setBedrooms] = useState(true);
  const [bedrooms2, setBedrooms2] = useState(false);
  const [bedrooms3, setBedrooms3] = useState(false);
  const [bedrooms4, setBedrooms4] = useState(false);
  const [studio, setStudio] = useState(false);
  const [rating, setRating] = useState(false);
  const [rating1, setRating1] = useState(false);
  const [rating2, setRating2] = useState(false);
  const [rating3, setRating3] = useState(false);
  const [rating4, setRating4] = useState(true);
  const [range, setRange] = useState(true);
  const [range1, setRange1] = useState(false);
  const [range2, setRange2] = useState(false);
  const [range3, setRange3] = useState(false);
  const [range4, setRange4] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const [hoTelsdata, setHotelsData] = useState(5);
  const [showNumbers, setShowNumbers] = useState('');

  const [showMoreRange, setShowMoreRange] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // console.log('Rating: ', rating);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handleSetRating = value => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (rating != value) {
      setRating(value);
    } else {
      setRating(null);
    }
    // handleShowResult();
  };

  const handleReset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setBedrooms(1);
    setStudio(false);
    setRating(4);
    setRange(100);
    setSliderValue(5);
  };

  useEffect(() => {
    (async () => {
      let DummyData = await AsyncStorage.getItem('HotelsData');
      DummyData = JSON.parse(DummyData);
      setHotelsData(DummyData);
      // handleShowResult(DummyData);
      // const reference = database();
      // console.log('reference: ', reference);
    })();
  }, [navigation]);

  const handleShowResult = async DummyData => {
    let filterData = DummyData || hoTelsdata;
    let newData = await filterData.filter(item => {
      return (
        item?.studio == studio &&
        range >= item.rate &&
        rating >= item.rating &&
        bedrooms >= item?.bedrooms &&
        sliderValue >= item.distance
      );
    });
    setShowNumbers(newData);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/baack.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
        <Text style={[styles.headText, {textAlign: 'center'}]}>Filters</Text>
        <TouchableOpacity style={styles.resetbtn} onPress={() => handleReset()}>
          <Image
            source={require('../../assets/reset.png')}
            style={styles.resetImg}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: 'black', fontSize: 16}}>Distance</Text>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 25,
            }}>
            <Slider
              style={{width: '100%', height: 35}}
              value={sliderValue}
              onValueChange={value => {
                setSliderValue(value);
                // handleShowResult();
              }}
              step={0.5}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#e67e45"
              maximumTrackTintColor="#e8e9e9"
              // thumbImage={require('../../assets/oval.png')}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: '#fff',
                borderColor: '#e67e45',
                borderWidth: 5,
              }}
              trackStyle={{height: 6, borderRadius: 7}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 12.5, color: '#6f7574'}}>Near Me</Text>
              <Text style={{fontSize: 12.5, color: '#6f7574'}}>
                {sliderValue} KM
              </Text>
              <Text style={{fontSize: 12.5, color: '#6f7574'}}>10 KM</Text>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 15}}>
          <Text style={{color: 'black', fontSize: 16}}>Star Rating</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 25,
            }}>
            <Pressable
              onPress={() => handleSetRating('unrated')}
              style={rating != 'unrated' ? styles.tab : styles.selectedTab}>
              <Text
                style={{
                  fontSize: 12.5,
                  letterSpacing: 0.6,
                  color: rating == 'unrated' ? 'white' : '#6f7574',
                }}>
                Unrated
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRating1(!rating1)}
              style={!rating1 ? styles.tab : styles.selectedTab}>
              <FontAwesome
                name="star"
                color={rating1 ? 'white' : '#ffbc02'}
                size={isIpad ? 30 : 16}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontSize: 12.5,
                  color: rating1 ? 'white' : '#6f7574',
                }}>
                {' '}
                1
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRating2(!rating2)}
              style={!rating2 ? styles.tab : styles.selectedTab}>
              <FontAwesome
                name="star"
                color={rating2 ? 'white' : '#ffbc02'}
                size={isIpad ? 30 : 16}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontSize: 12.5,
                  color: rating2 ? 'white' : '#6f7574',
                }}>
                {' '}
                2
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRating3(!rating3)}
              style={!rating3 ? styles.tab : styles.selectedTab}>
              <FontAwesome
                name="star"
                color={rating3 ? 'white' : '#ffbc02'}
                size={isIpad ? 30 : 16}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontSize: 12.5,
                  color: rating3 ? 'white' : '#6f7574',
                }}>
                {' '}
                3
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRating4(!rating4)}
              style={!rating4 ? styles.tab : styles.selectedTab}>
              <FontAwesome
                name="star"
                color={rating4 ? 'white' : '#ffbc02'}
                size={isIpad ? 30 : 16}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontSize: 12.5,
                  color: rating4 ? 'white' : '#6f7574',
                }}>
                {' '}
                4+
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{marginHorizontal: 15}}>
          <Text style={{color: 'black', fontSize: 16}}>Property Type</Text>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                Studio
              </Text>
              {
                <Pressable
                  style={styles.checkImg}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setStudio(!studio);
                    // handleShowResult()
                  }}>
                  {studio ? (
                    <Image
                      source={require('../../assets/check.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../assets/uncheck.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              }
            </View>
            <View
              style={{
                height: 0.5,
                width: '98%',
                backgroundColor: '#ced7d5',
                marginVertical: 10,
              }}></View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                One Bedrooms
              </Text>
              {
                <Pressable
                  style={styles.checkImg}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setBedrooms(!bedrooms);
                    // handleShowResult();
                  }}>
                  {bedrooms ? (
                    <Image
                      source={require('../../assets/check.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../assets/uncheck.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              }
            </View>
            {showMore && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}
            {showMore && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  Two Bedrooms
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setBedrooms2(!bedrooms2);
                      // handleShowResult();
                    }}>
                    {bedrooms2 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
            {showMore && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}
            {showMore && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  Three Bedrooms
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setBedrooms3(!bedrooms3);
                      // handleShowResult();
                    }}>
                    {bedrooms3 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
            {showMore && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}
            {showMore && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  Four+ Bedrooms
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setBedrooms4(!bedrooms4);
                      // handleShowResult();
                    }}>
                    {bedrooms4 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setShowMore(!showMore);
            }}>
            <Text
              style={{
                alignSelf: 'flex-end',
                paddingRight: 5,
                color: '#e67e45',
              }}>
              {showMore ? 'See Less' : 'See More'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: 'black', fontSize: 16}}>Price Range</Text>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                $1 - $100
              </Text>
              {
                <Pressable
                  style={styles.checkImg}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setRange(!range);
                    // handleShowResult();
                  }}>
                  {range ? (
                    <Image
                      source={require('../../assets/check.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../assets/uncheck.png')}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              }
            </View>
            {
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            }
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  $101 - $200
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setRange1(!range1);
                      // handleShowResult();
                    }}>
                    {range1 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            }
            {showMoreRange && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}
            {showMoreRange && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  $201 - $300
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setRange2(!range2);
                      // handleShowResult();
                    }}>
                    {range2 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
            {showMoreRange && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}

            {showMoreRange && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  $301 - $400
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setRange3(!range3);
                      // handleShowResult();
                    }}>
                    {range3 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
            {showMoreRange && (
              <View
                style={{
                  height: 0.5,
                  width: '98%',
                  backgroundColor: '#ced7d5',
                  marginVertical: 10,
                }}></View>
            )}
            {showMoreRange && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 13, letterSpacing: 0.6, color: '#6f7574'}}>
                  $401 - $500
                </Text>
                {
                  <Pressable
                    style={styles.checkImg}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setRange4(!range4);
                      // handleShowResult();
                    }}>
                    {range4 ? (
                      <Image
                        source={require('../../assets/check.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/uncheck.png')}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </Pressable>
                }
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setShowMoreRange(!showMoreRange);
            }}>
            <Text
              style={{
                alignSelf: 'flex-end',
                paddingRight: 5,
                color: '#e67e45',
              }}>
              {showMoreRange ? 'See Less' : 'See More'}
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={styles.btnImg}
          onPress={async () => {
            await AsyncStorage.setItem(
              'filters',
              JSON.stringify({
                studio,
                range,
                range1,
                range2,
                range3,
                range4,
                rating1,
                rating2,
                rating3,
                rating4,
                bedrooms,
                bedrooms2,
                bedrooms3,
                bedrooms4,
                sliderValue,
              }),
            );
            navigation.navigate('search');
          }}>
          <Text style={{color: 'white'}}>Show Results</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Filters;

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
    alignSelf: 'center',
  },
  heartImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(10),
    alignSelf: 'center',
  },
  samImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(10),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(19),
    borderRadius: 10,
  },
  itemImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(5),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(15),
    borderRadius: 10,
  },
  resetbtn: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(4.2),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(20),
    borderRadius: 25,
  },
  slideImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(10.5),
    width: '100%',
  },
  checkImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(3.2),
    width: Platform.isPad ? heightPercentage(4) : heightPercentage(4),
  },
  btnImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(6),
    width: Platform.isPad ? widthPercentage(4) : widthPercentage(90),
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#439281',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetImg: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  subImg: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  selectedTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#439281',
    borderRadius: 8,
  },
});
