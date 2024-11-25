import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import ProductCart from '../components/ProductCart';
import {useState} from 'react';
import {Items} from '../database/Database';

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  useEffect(() => {
    getDataFromDB();
  }, []);

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index]);
      } else {
        accessoryList.push(Items[index]);
      }
    }
    setProducts(productList);
    setAccessory(accessoryList);
  };
  return (
    <View
      style={{backgroundColor: Colors.white, width: '100%', height: '100%'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity>
            <Feather
              name="shopping-bag"
              style={{
                fontsize: 18,
                color: Colors.blue,
                backgroundColor: Colors.backgroundLight,
                padding: 12,
                margin: 10,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <Feather
              name="shopping-cart"
              style={{
                fontsize: 18,
                color: Colors.blue,
                backgroundColor: Colors.backgroundLight,
                padding: 12,
                margin: 10,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 10, padding: 16}}>
          <Text style={styles.text}>Ftz Shop & Service</Text>
          <Text style={{fontSize: 14, fontWeight: '400', letterSpacing: 1}}>
            Audio shop on Rustovelli Ave 57
          </Text>
        </View>

        <View style={{padding: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.black,
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                41
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{fontSize: 14, color: Colors.blue, fontWeight: '400'}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {products.map(data => (
              <ProductCart key={data.id} data={data} />
            ))}
          </View>
        </View>
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Accessories</Text>
              <Text style={{marginLeft: 6}}>78</Text>
            </View>
            <Text>See All</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {accessory.map(data => (
              <ProductCart data={data} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    collor: Colors.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
});
