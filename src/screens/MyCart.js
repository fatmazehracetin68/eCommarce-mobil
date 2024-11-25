import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import Cart from '../components/Cart';

export default function MyCart() {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getDataFromDB();
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);

    let productData = [];

    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1;
          productData.push(data);
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice =
        productData[index].productPrice * productData[index].quantity;
      total += productPrice;
    }
    setTotal(total);
  };
  const checkout = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    navigation.navigate('Home');
  };

  return (
    <>
      {product.length > 0 ? (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
            }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={18} />
            </TouchableOpacity>
            <Text style={styles.order}>Order Details</Text>
          </View>
          <ScrollView>
            <View>
              {product.length > 0
                ? product.map(data => (
                    <Cart
                      data={data}
                      product={product}
                      setProduct={setProduct}
                      getDataFromDB={getDataFromDB}
                      getTotal={getTotal}
                    />
                  ))
                : null}
            </View>
            <View>
              <View>
                <Text style={styles.locationText}>Delivery Location</Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignItems: 'center',
                        margin: 12,
                      }}>
                      <View style={styles.deliveryBox}>
                        <MaterialCommunityIcons
                          name="truck-delivery-outline"
                          size={18}
                          color={Colors.blue}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: 600,
                          }}>
                          İstanbul-Beşiktaş
                        </Text>
                      </View>
                    </View>
                    <View>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={22}
                        color={Colors.black}
                        style={{marginRight: 8}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.locationText}>Payment Method</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', gap: 10, margin: 14}}>
                  <View style={styles.paddingCart}>
                    <Text style={{color: Colors.blue}}>VISA</Text>
                  </View>
                  <View>
                    <Text>VISA Classic</Text>
                    <Text>****-2121</Text>
                  </View>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={Colors.black}
                    style={{marginRight: 8}}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.locationText}>Order Info</Text>
              <View
                style={{paddingHorizontal: 16, marginVertical: 10, gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Subtotal</Text>
                  <Text>{total} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{opacity: 0.5, fontSimze: 12, fontWeight: '400'}}>
                    Shoping Tax
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    {total / 20} ₺
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Total</Text>
                  <Text>{total + total / 20} ₺</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 10,

              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => checkout()}
              style={{
                backgroundColor: Colors.blue,
                width: '86%',
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{color: Colors.white, fontSize: 12, fontWeight: '500'}}>
                {' '}
                CHECKOUT {total + total / 20}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            fontSize: 16,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text>Sepette Ürün Bulunmamaktadır</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{marginTop: 10}}>
            <Text style={{textDecorationLine: 'underline', color: 'blue'}}>
              Ürün eklemek için anasayfaya gidiniz.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backButton: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 12,
  },
  orderTitle: {fontSize: 14, color: Colors.black, fontWeight: '400'},
  locationText: {
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: 16,
    fontWeight: 600,
  },
  deliveryBox: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
  },
  paddingCart: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
