import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../../redux/actions/productsActions';
import { View, Text, Image, TouchableOpacity ,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 







 export default function CarritoPage() {
   const dispatch = useDispatch();
   const [cartProductIds, setCartProductIds] = useState([]);
   const [productCount, setProductCount] = useState({});
   const read_products = useSelector(store => store.products.products);
 
   useEffect(() => {
     dispatch(productsActions.read_products());
     async function loadCartData() {
       try {
         let storedCartProductIds = await AsyncStorage.getItem('product_cart') ;
          storedCartProductIds= storedCartProductIds ? JSON.parse(storedCartProductIds):[]
         const countObj = {};
         
         if (!Array.isArray(storedCartProductIds)) {
          storedCartProductIds = []; 
        }
          storedCartProductIds?.forEach(id => {
           if (countObj[id]) {
             countObj[id]++;
           } else {
             countObj[id] = 1;
           }
         }); 
         setCartProductIds(storedCartProductIds);
         setProductCount(countObj);
       } catch (error) {
         console.error('Error loading cart data:', error);
       }
     }
     loadCartData();
   }, [dispatch]);
 
  const cartProducts = read_products.filter(product => cartProductIds.includes(product._id));
   
  
  const calculateTotalAmount = () => {
    let total = 0;
    cartProducts?.forEach(product => {
      if (productCount[product._id]) {
        total += product.price * productCount[product._id];
      }
    });
    return total;
  };

  const updateProductCount = async (productId, newCount) => {
    if (newCount <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCountObj = { ...productCount, [productId]: newCount };
      setProductCount(updatedCountObj);
      try {
        await AsyncStorage.setItem('product_cart', JSON.stringify(Object.keys(updatedCountObj)));
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCountObj = { ...productCount };
    delete updatedCountObj[productId];
    setProductCount(updatedCountObj);
    setCartProductIds(cartProductIds.filter(id => id !== productId));
    try {
      await AsyncStorage.setItem('product_cart', JSON.stringify(Object.keys(updatedCountObj)));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };
  

  
  return (
    <ScrollView>
      <View style={{ backgroundColor: '#f0eeee', paddingVertical: 20}}>
        <Text style={{ marginLeft: 20, color: '#5a5858', fontSize: 30 }}>
        Productos en el carrito:
      </Text>
      
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: 20,
          paddingHorizontal: 20,
          
        }}
      >
        
        {cartProducts.map(product => (
          <View
            key={product._id}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              width: 220,
              padding: 20,
              height: 350,
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: product.cover_photo[0] }}
              style={{ width: '100%', height: 120, marginBottom: 30 }}
            />
            <Text style={{ color: 'gray', marginBottom: 5 }}>{product.title}</Text>
            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 10 }}>
              Total: UDS${product.price * productCount[product._id]}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                Cantidad: {productCount[product._id]}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => updateProductCount(product._id, productCount[product._id] - 1)}
                  style={{ backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}
                >
                  <Text style={{ color: 'white' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{productCount[product._id]}</Text>
                <TouchableOpacity
                  onPress={() => updateProductCount(product._id, productCount[product._id] + 1)}
                  style={{ backgroundColor: 'green', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}
                >
                  <Text style={{ color: 'white' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(product._id)}
              style={{ marginTop: 10, backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Eliminar producto</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Monto Total: UDS${ calculateTotalAmount() }
        </Text>
      </View>
      
    </View>
    </ScrollView>
  );
}