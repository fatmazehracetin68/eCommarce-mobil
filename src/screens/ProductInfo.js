import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import {Colors} from '../themes/Colors';
import {StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductInfo() {
  const width = Dimensions.get('window').width;
  const route = useRoute();
  const navigation = useNavigation();
  const {productID} = route.params;
  const [product, setProduct] = useState([]);

  const clearAsyncStroge = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromDB();
    // clearAsyncStroge();
  }, [navigation]);

  const getDataFromDB = () => {
    const product = Items.find(item => item.id == productID);
    if (product) {
      setProduct(product);
      return;
    }
  };

  const addToCart = async id => {
    console.log('addToCart called with id:', id);
    let itemArray = await AsyncStorage.getItem('cartItems');
    console.log('Current Cart Items:', itemArray);
    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        console.log('Updated Cart Items:', array);
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={{width: '100%', paddingTop: 16, paddingLeft: 16}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={product.productImageList ? product.productImageList : null}
            snapToInterval={width}
            decelerationRate={0.8}
            bounces={false}
            renderItem={({item}) => (
              <View style={{width: width, height: 240}}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={item}
                />
              </View>
            )}
          />
          <View
            style={{
              width: '80%',
              height: 2.4,
              backgroundColor: 'black',
              margin: 'auto',
              opacity: 0.5,
            }}>
            <Text>aaa</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 6,
              flexDirection: 'row',
              marginTop: 25,
            }}>
            <Entypo
              name="shopping-cart"
              style={{fontSize: 18, color: Colors.blue}}
            />
            <Text style={{color: Colors.black, fontSize: 12, marginLeft: 6}}>
              Shopping
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              letterSpacing: 0.4,
              color: Colors.black,
              maxWidth: '84%',
              margin: 9,
            }}>
            {product.productName}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.blue + 20,
              padding: 8,
              borderRadius: 100,
              marginRight: 6,
            }}>
            <Ionicons name="link-outline" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              color: Colors.black,
              fontWeight: '400',
              maxWidth: '85%',
              opacity: 0.5,
              lineHeight: 20,
              margin: 10,
            }}>
            {' '}
            {product.description}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
            <View
              style={{
                backgroundColor: Colors.backgroundLight,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 12,
                marginRight: 10,
                borderRadius: 100,
              }}>
              <Entypo name="location-pin" size={16} color={Colors.blue} />
            </View>
            <Text>İstanbul ÜSküdar {'\n'} 17-0001</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={22} style={{marginRight: 14}} />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: Colors.black,
              margin: 10,
            }}>
            {product.productPrice} ₺
          </Text>
          <Text style={{marginLeft: 10}}>
            Tax Rate %2 {product.productPrice / 20} ₺{' '}
            {product.productPrice + product.productPrice / 20}₺
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '8%',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('Button pressed');
            product.isAvailable ? addToCart(product.id) : null;
          }}
          style={{
            backgroundColor: Colors.blue,
            width: '86%',
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Text style={{fontSize: 15, fontWeight: '500', color: Colors.white}}>
            {product.isAvailable ? 'Add to Cart' : 'Not Avaible'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    white: '100%',
    height: '100%',
    position: 'relative',
  },
  icon: {fontSize: 18},
  color: Colors.backgroundDark,
  backgroundColor: Colors.white,
  padding: 12,
  borderRadius: 10,
});
