import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>#thecrew</Text>
            <Text style={styles.centeredText}>Explore NC</Text>
            <Text style={styles.descriptionText}>Experience the heart of NC and forge lasting memories with friends.</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Join for Free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fefcfb',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
    },
    centeredText: {
        fontSize: 40,
        fontWeight: '600',
        position: 'absolute',
        top: '40%',
        transform: [{ translateY: -10 }], // Adjusts for half the height of the text
    },
    descriptionText: {
        fontSize: 18,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        paddingHorizontal: 20, // To ensure the text doesn't touch the screen edges
    },
    buttonContainer: {
        position: 'absolute', // This will position the buttons at the bottom
        bottom: 50, // Adjust this value to change the distance from the bottom
        width: '80%',
    },
    joinButton: {
        backgroundColor: '#489fb5',
        padding: 15,
        borderRadius: 25,
        marginBottom: 10,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default WelcomeScreen;
