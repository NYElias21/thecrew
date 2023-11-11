import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);

                // Use the updateProfile function instead of user.updateProfile
                updateProfile(user, {
                    displayName: fullName,
                }).then(() => {
                    console.log('Updated user display name:', fullName);
                }).catch((error) => {
                    console.error('Error updating user display name:', error);
                });

                // Navigate to another screen or show a success message
                navigation.navigate('Your_Next_Screen'); // Replace 'Your_Next_Screen' with your desired screen
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', errorCode, errorMessage);
                Alert.alert('Error', errorMessage);
            });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the crew!</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={setFullName}
                value={fullName}
                underlineColorAndroid="black"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                underlineColorAndroid="black"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                underlineColorAndroid="black"
            />
            <TouchableOpacity style={styles.joinButton} onPress={handleSignup}>
                <Text style={styles.buttonText}>Join the crew</Text>
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
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 40,
        marginBottom: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    joinButton: {
        backgroundColor: '#489fb5',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default SignupScreen;
