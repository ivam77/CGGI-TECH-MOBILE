import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handleLocationChange = (text) => {
        setLocation(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const handleRegisterClick = async () => {
        if (!email || !location || !password) {
            showMessage({
                message: "Error",
                description: "Please complete all fields.",
                type: "danger",
            });
            return;
        }

        try {
            setIsRegistering(true);
            const response = await fetch(
                "https://mobile-cggi.onrender.com/api/user/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, location, password, photo: imageUri }),
                }
            );
            const data = await response.json();
            setIsRegistering(false);
            showMessage({
                message: "Success",
                description: "User registered successfully!",
                type: "success",
                animated: true,
                animationDuration: 800,
                icon: { icon: "success", position: "right" },
                style: { paddingVertical: 20, paddingHorizontal: 80 },
            });
            navigation.navigate('Login');
            console.log("Success:", data);
        } catch (error) {
            setIsRegistering(false);
            showMessage({
                message: "Error",
                description: "Something went wrong, please try again later.",
                type: "danger",
            });
            console.log("Error:", error);
        }
    };

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
                <View style={styles.nav1}>
                    <Text style={styles.text}>Create your account and buy from wherever you are..</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email @"
                            value={email}
                            onChangeText={handleEmailChange}
                        />

                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Location 🗺"
                            value={location}
                            onChangeText={handleLocationChange}
                        />

                        <Text style={styles.label}>Profile Photo</Text>
                        <TouchableOpacity
                            style={styles.imagePicker}
                            onPress={handleImagePicker}
                        >
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                            ) : (
                                <Text style={styles.imagePickerText}>Select Image</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password 🔒"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegisterClick}
                            disabled={isRegistering}
                        >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Resto de la interfaz de usuario ... */}
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
        marginTop: "20%"
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
