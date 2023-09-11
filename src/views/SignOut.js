import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut = (props) => {
    removeFew = async () => {
        const keys = ['token', 'user']
        try {
          await AsyncStorage.multiRemove(keys)
        } catch(e) {
          
        }
      
        console.log('Done')
      }

  return (
    <View>
      <Text>Signing Out...</Text>
    </View>
  );

};

export default SignOut;
