import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { apiUrl, endpoints } from '../../utils/api';
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image,} from "react-native";

export default function LoginScreen() {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleFormSubmit(event) {
        event.preventDefault();
      
        if (!email || !password) {
          alert('Please enter email and password.');
          return;
        }
      
        let data = {
          email: email,
          password: password,
        };
      
        axios.post(apiUrl + endpoints.login, data)
        .then(res => {
          if (res && res.data && res.data.response) {
            const { user, photo, token } = res.data.response;
    
            AsyncStorage.setItem('token', token)
            .then(() => {
              if (user !== null && user !== undefined) {
                return AsyncStorage.setItem('user', JSON.stringify(user));
              }
            })
            .then(() => {
              if (photo !== null && photo !== undefined) {
                return AsyncStorage.setItem('photo', photo);
              }
            })
            .then(() => {
              alert('User signed in!');
              navigation.navigate('Home');
            })
            .catch(error => {
              console.log(error);
              alert('An error occurred while saving data. Please try again later.');
            });
          
          } else {
            alert('Invalid response from the server');
          }
        })
        .catch(error => {
          if (error.response && error.response.data) {
            const err = error.response.data.message || 'Unknown error';
            alert(`Authentication failed! : ${err}`);
          } else {
            console.log(error.message)
            alert('An error occurred. Please try again later.');
          }
        });
      }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.navbar}>
                    <View style={styles.nav1}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <AntDesign name="bars" style={styles.menu} />
                        </TouchableOpacity>
                        <AntDesign name="shoppingcart" style={styles.logo} />
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry={true} onChangeText={setPassword}  />
                        <TouchableOpacity style={styles.registerButton} onPress={handleFormSubmit} >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.linkText}>
                        Already have an account?
                        <TouchableOpacity onPress={() => { navigation.navigate("Register"); }} >
                            <Text style={styles.link}> Sign up</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.linkText}>
                        Go back to
                        <TouchableOpacity style={styles.link} onPress={() => { navigation.navigate("Home"); }} >
                            <Text style={styles.link}> Home page</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    formContainer: {
        width: "80%",
        marginTop: "20%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: "#007BFF",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkText: {
        fontSize: 12,
        marginBottom: 5,
    },
    link: {
        color: "#007BFF",
    },
});