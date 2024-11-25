import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({
  data,
  product,
  setProduct,
  getDataFromDB,
  getTotal,
}) {
  const navigation = useNavigation();

  const removeItemFromCart = async id => {
    let itemsArray = await AsyncStorage.getItem('cartItems');
    itemsArray = JSON.parse(itemsArray);
    if (itemsArray) {
      let array = itemsArray.filter(item => item != id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };

  const updataQuantity = (id, type) => {
    let updateProduct = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        item.quantity = newQuantity > 0 ? newQuantity : removeItemFromCart(id);
      }
      return item;
    });
    setProduct(updateProduct);
    getTotal(updateProduct);
  };

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}>
      <View style={styles.imageContainer}>
        <Image source={data.productImage} style={styles.image} />
      </View>
      <View style={styles.product}>
        <View>
          <Text>{data.productName}</Text>
        </View>
        <View style={styles.price}>
          <Text>{data.productPrice * data.quantity}</Text>
          <Text style={{fontSize: 12}}>
            (
            {data.productPrice * data.quantity +
              (data.productPrice * data.quantity) / 20}
            ) eski fiyat
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => updataQuantity(data.id, 'decrease')}>
              <MaterialCommunityIcons name="minus" style={styles.button} />
            </TouchableOpacity>
            <Text>{data.quantity}</Text>
            <TouchableOpacity
              onPress={() => updataQuantity(data.id, 'increase')}>
              <MaterialCommunityIcons name="plus" style={styles.button} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
            <MaterialCommunityIcons name="delete" style={styles.delete} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    marginRight: 22,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  product: {
    flex: 1,

    height: '100%',
    justifyContent: 'space-around',
  },
  touchable: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
    marginTop: 4,
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'gray',
    padding: 3,
    marginHorizontal: 10,
    color: 'white',
    borderRadius: 100,
  },
  delete: {fontSize: 18, marginHorizontal: 10},
});
