import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ResultProducts() {
  const read_products = useSelector((store) => store.products.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const savedSearch = await AsyncStorage.getItem('search');
        const savedSearchTerm = await AsyncStorage.getItem('searchTerm');

        if (savedSearch) {
          const parsedMatchingProductIds = JSON.parse(savedSearch);
          setSearchQuery(savedSearchTerm);

          const productsToShow = read_products.filter(product => parsedMatchingProductIds.includes(product._id));
          setFilteredProducts(productsToShow);
        }
      } catch (error) {
        console.error('Error fetching search data:', error);
      }
    };

    fetchSearchData();
  }, [read_products, filteredProducts]);

  const navigateToProduct = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  return (
    <ImageBackground source={require('../../assets/backgroundHome.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.nav1}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="bars" style={styles.menu} />
            </TouchableOpacity>
            <AntDesign name="shoppingcart" style={styles.logo} />
          </View>
        </View>
        <View style={{ flex: 1, paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 22, color:'white', marginBottom: 20 }}>Search Results for: {searchQuery}</Text>
          <ScrollView>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
              {filteredProducts.map((product) => (
                <TouchableOpacity key={product._id} style={styles.cardItem} onPress={() => navigateToProduct(product._id)} >
                  <Image source={{ uri: product.cover_photo[0] }} style={styles.cardImage} />
                  <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 }}>{product.title}</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>USD$ {product.price}</Text>
                  <Text style={{ color: '#5ea85e', fontWeight: 'bold', fontSize: 20 , margin: 10 }}>Withdraw it NOW!</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 20,
  },
  imageBackground: {
      flex: 1,
      resizeMode: "cover", 
  },
  navbar: {
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  nav1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingTop: 10,
  },
  logo: {
      width: 55,
      height: 55,
      fontSize: 40,
      color: 'white'
  },
  menu: {
      width: 55,
      height: 55,
      fontSize: 40,
      color: 'white'
  },
  searchInput: {
      backgroundColor: 'white',
      padding: 10,
      margin: 20,
      borderRadius: 8,
      width: '80%'
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFFBEB',
  },
  button: {
      padding: 10,
      alignItems: 'center',
  },
  buttonIcon: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
  },
  cardItem: {
      justifyContent: 'justify-center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '90%',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      margin: 10,
  },
  cardImage: {
      resizeMode: 'contain',
      width: 250,
      height: 250,
      marginBottom: 10
  },
})