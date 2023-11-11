import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Corrected import

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password) // Use the directly imported function
            .then((userCredential) => {
                // Logged in successfully
                const user = userCredential.user;
                console.log('User logged in:', user);
                Alert.alert('Success', 'Logged in successfully!');
                // You can navigate to another screen here if needed
                navigation.navigate('Home', { screen: 'Feed' });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error logging in:', errorCode, errorMessage);
                Alert.alert('Error', errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                underlineColorAndroid="black"
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                underlineColorAndroid="black"
                placeholderTextColor="gray"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fefcfb',
    },
    title: {
        fontSize: 24,
        marginBottom: 40, // Increased space after the title
        textAlign: 'center',
    },
    input: {
        height: 40,
        marginBottom: 30, // Increased space between the forms
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    loginButton: {
        backgroundColor: '#489fb5',
        padding: 15,
        borderRadius: 25,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    signupText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
    },
});

export default LoginScreen;
