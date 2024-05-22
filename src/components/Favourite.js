import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentage, widthPercentage} from '../utils';
import DummyData from '../utils/Data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';


const Favourite = ({navigation}) => {
  const [favHotelsData, setFavHotelsData] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [allHotelsData, setAllHotelsData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let hotelsData = await AsyncStorage.getItem('HotelsData');
      let allHotesArr = JSON.parse(hotelsData);
      setAllHotelsData(allHotesArr)
      let newData = await allHotesArr.filter(item => {
        return item?.like;
      });
      setFavHotelsData(newData);
      
    })();
  }, [navigation, isFocused, likeState]);

  const handleFav = async id => {
      let AllHotelsData = allHotelsData;
      AllHotelsData?.forEach(item => {
      if (item?.id == id) {
        item['like'] = false;
      }
    });
    await AsyncStorage.setItem('HotelsData', JSON.stringify(AllHotelsData));
    setLikeState(!likeState);
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
        <Text style={[styles.headText, {textAlign: 'center'}]}>Favorites</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Image
            source={require('../../assets/filter.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {favHotelsData?.map((item, index) => {
          return (
            <View
              key={index + 1}
              style={{
                paddingHorizontal: 13,
                paddingVertical: 13,
                marginHorizontal: 15,
                backgroundColor: 'white',
                borderRadius: 15,
                marginBottom: 20,
              }}>
              <Text style={{color: 'black', paddingBottom: 5}}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '60%',
                  }}>
                  <View style={styles.samImg}>
                    <Image
                      source={require('../../assets/sample.png')}
                      style={styles.subImg}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 13,
                      paddingLeft: 10,
                      letterSpacing: 0.6,
                      paddingRight: 5,
                      color: "#6f7574"
                    }}>
                    {item?.descreption?.slice(0, 100)}
                  </Text>
                </View>
                <View style={{alignItems: 'center', alignSelf: 'flex-start'}}>
                  <Text style={{color: "#7b7d82"}}>${item?.rate}</Text>
                  <View style={styles.itemImg}>
                    {item?.rating.toFixed(0) == 1 ? (
                      <Image
                        source={require('../../assets/Item-checked.png')}
                        style={styles.subImg}
                      />
                    ) : item?.rating.toFixed(0) == 2 ? (
                      <Image
                        source={require('../../assets/Item.png')}
                        style={styles.subImg}
                      />
                    ) : item?.rating.toFixed(0) == 3 ? (
                      <Image
                        source={require('../../assets/Item.png')}
                        style={styles.subImg}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/Item.png')}
                        style={styles.subImg}
                      />
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleFav(item?.id)}>
                    <Image
                      source={require('../../assets/likedheart.png')}
                      style={styles.likeImg}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favourite;

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
  subImg: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  likeImg: {
    height: Platform.isPad ? heightPercentage(4) : heightPercentage(2.6),
    width: Platform.isPad ? widthPercentage(6) : widthPercentage(6),
    alignSelf: 'center',
    marginTop: 10,
  },
});
