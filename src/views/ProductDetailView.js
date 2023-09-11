import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { api, apiUrl, endpoints } from '../../utils/api'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailView = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await api.get(apiUrl + endpoints.product + productId);
        setProduct(data.product);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchProductDetails();
  }, [productId]);

  const handleGoBack = (productId) => {
    navigation.navigate('ProductDetails', { productId });
};

  return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.nav1}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="bars" style={styles.menu} />
            </TouchableOpacity>
            <AntDesign name="shoppingcart" style={styles.logo} />
          </View>
        </View>
        <ScrollView>
          {product && (
            <View>
              <View style={styles.container1}>
                <View>
                  <Text style={styles.sectionTitle}>TECHNICAL CHARACTERISTICS</Text>
                  <View style={styles.header}>
                    <Text style={styles.brand}>{product.brand}</Text>
                    <Text style={styles.title}>{product.title}</Text>
                  </View>
                  <View style={styles.container6}>
                      {
                        product.type === "TV" ? ( 
                          <View style={styles.content}>
                            <View style={styles.content2}>
                              <Text>Screen</Text>
                              <View style={styles.content3}>
                                {Object.entries(product.description.screen).map(([key, value], index) => (
                                  <View key={index} style={[ styles.rowContainer, { backgroundColor: index % 2 === 0 ? styles.evenRow : styles.oddRow }, ]} >
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                              </View>
                              <Text>GeneralFeatures</Text>
                              <View style={styles.content3}>
                                {Object.entries(product.description.GeneralFeatures).map(([key, value], index) => (
                                  <View key={index} style={[ styles.rowContainer, { backgroundColor: index % 2 === 0 ? styles.evenRow : styles.oddRow }, ]} >
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                              </View>
                              <Text>Connectivity</Text>
                              <View style={styles.content3}>
                                {Object.entries(product.description.Connectivity).map(([key, value], index) => (
                                  <View key={index} style={[ styles.rowContainer, { backgroundColor: index % 2 === 0 ? styles.evenRow : styles.oddRow }, ]} >
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                              </View>
                              <Text>Sound</Text>
                              <View style={styles.content3}>
                                {Object.entries(product.description.Sound).map(([key, value], index) => (
                                  <View key={index} style={[ styles.rowContainer, { backgroundColor: index % 2 === 0 ? styles.evenRow : styles.oddRow }, ]} >
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                              </View>
                              <Text>Dimensions</Text>
                              <View style={styles.content3}>
                                {Object.entries(product.description.Dimensions).map(([key, value], index) => (
                                  <View key={index} style={[ styles.rowContainer, { backgroundColor: index % 2 === 0 ? styles.evenRow : styles.oddRow }, ]} >
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                              </View>
                              <View style={styles.rowContainer}>
                                <Text style={styles.keyText}>Model</Text>
                                <Text style={styles.valueText}>{product.description.Model}</Text>
                              </View>
                              <View style={styles.rowContainer}>
                                <Text style={styles.keyText}>Origin</Text>
                                <Text style={styles.valueText}>{product.description.Origin}</Text>
                              </View>
                            </View>
                          </View>
                         ) : ((product.category === "TV, AUDIO AND VIDEO" && product.type !== "TV") || product.category === "NOTEBOOKS AND DESKTOPS" || product.category === "CELLPHONES AND TABLETS" || product.category === "Electrodomestics") ? (
                          <View style={styles.content}>
                            <View style={styles.columnContainer}>
                              {Object.entries(product.description)
                                .filter(([key]) => key !== "Text")
                                .map(([key, value], index) => (
                                  <View key={index} style={[styles.rowContainer, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                            </View>
                          </View>
                         ) : (product.type === "Mouse" || product.type === "Chair") ? (
                          <View style={styles.descriptionContainer}>
                            <View style={styles.descriptionInnerContainer}>
                              <Text style={styles.descriptionText}>{product.description}</Text>
                            </View>
                          </View>
                         ) : (product.type === "pc" && product.category === "gamers") ? (
                          <View style={styles.content}>
                            <View style={styles.columnContainer}>
                              {Object.entries(product.description.features)
                                .filter(([key]) => key !== "Text")
                                .map(([key, value], index) => (
                                  <View key={index} style={[styles.rowContainer, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                                    <Text style={styles.keyText}>{key}</Text>
                                    <Text style={styles.valueText}>{value}</Text>
                                  </View>
                                ))}
                            </View>
                          </View>
                         ) : <Text />
                      }
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={styles.container4}>
            <TouchableOpacity style={styles.buttonBack} onPress={handleGoBack}>
              <Text style={styles.back}>GO TO BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBack} >
            <Text style={styles.cart}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  )
}

export default ProductDetailView

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 20,
  },
  navbar: {
    backgroundColor: '#007BFF',
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
  container1: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 5,
    paddingBottom: 20,
    marginTop: 40,
    marginBottom: 10
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    marginBottom: 15
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    margin: 2
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    margin: 2,
    marginBottom: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  content2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%'
  },
  content3: {
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  rowContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 10,
  },
  keyText: {
    fontWeight: 'bold',
  },
  valueText: {
    marginLeft: '20%',
    width: '40%',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 22,
    color: 'gray',
    margin: 22,
    textAlign: 'center'
  },
  container6: {
    margin: 2,
  },
  evenRow: {
    backgroundColor: '#D8E7FE'
  },
  oddRow: {
    backgroundColor: '#ECF3FE'
  },
  back: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'black',
    width: 150,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonBack: {
    alignSelf: 'center',
    marginBottom: 20
  },
  container4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  cart: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'green',
    width: 150,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  },
})