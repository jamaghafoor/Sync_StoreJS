import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import {heightPercentage, widthPercentage} from '../utils';

const Details = ({navigation}) => {
  const data = [
    {
      name: 'Super Beds',
      desc: 'The Kitchen Beds are Very Special which includes One room and a kitchen',
    },
    {
      name: 'Twin Beds',
      desc: 'The Twin Beds are Very Special which includes two in same room',
    },
    {
      name: 'Single Bed',
      desc: 'The Single Bed are Very Special which includes one queen bed.',
    },
    {
        name: 'Kitchen Beds',
        desc: 'The Kitchen Beds are Very Special which includes One room and a kitchen',
      },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/baack.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
        <Text style={[styles.headText, {textAlign: 'center'}]}>Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Image
            source={require('../../assets/filter.png')}
            style={styles.heartImg}
          />
        </TouchableOpacity>
      </View>
      {data.map((item, index) => {
        return (
          <View
            key={index + 1}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginHorizontal: 15,
              backgroundColor: 'white',
              borderRadius: 15,
              marginBottom: 20,
            }}>
            <Text style={{color: 'black', paddingBottom: 5}}>{item.name}</Text>
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
                    style={{fontSize: 13, paddingLeft: 10, letterSpacing: 0.6}}>
                   {item?.desc}
                  </Text>
            
              </View>
              <View style={{alignItems: 'center', alignSelf: 'flex-start'}}>
                <Text>$165</Text>
                <View style={styles.itemImg}>
                  {index == 1 ? (
                    <Image
                      source={require('../../assets/Item-checked.png')}
                      style={styles.subImg}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/Item.png')}
                      style={styles.subImg}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Details;

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
});
