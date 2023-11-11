import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { auth } from './firebaseConfig';

const AccountScreen = () => {
    const user = auth.currentUser;

    // Dummy data for demonstration
    const followersCount = 150; // Fetch this from your backend
    const followingCount = 80;  // Fetch this from your backend
    const coverImage = require('../assets/post.jpg'); // Replace with your cover image URL
    const profilePic = require('../assets/profilePic.jpg'); // Using require for local image
    const userName = "John Doe"; // Fetch this from your backend or authentication provider
    const userCity = "Charlotte"; // Fetch this from your backend or user profile

    const [activeTab, setActiveTab] = useState('Created');

    const handleLogout = () => {
        auth.signOut().then(() => {
            console.log('User signed out!');
            // Navigate to login or another screen if needed
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.coverContainer}>
                <Image source={coverImage} style={styles.coverImage} />
                <View style={styles.profileImageContainer}>
                    <Image source={profilePic} style={styles.profilePic} />
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userCity}>{userCity}</Text>
                <View style={styles.userStats}>
                    <Text style={styles.statText}>{followersCount} <Text style={styles.statLabel}>Followers</Text></Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.statText}>{followingCount} <Text style={styles.statLabel}>Following</Text></Text>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.editButton]}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.addFriendsButton]}>
                    <Text style={styles.buttonText}>Add Friends</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Created' && styles.activeTab]}
                    onPress={() => setActiveTab('Created')}
                >
                    <Text style={activeTab === 'Created' ? styles.activeTabText : styles.tabText}>Created</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Saved' && styles.activeTab]}
                    onPress={() => setActiveTab('Saved')}
                >
                    <Text style={activeTab === 'Saved' ? styles.activeTabText : styles.tabText}>Saved</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabContent}>
                {activeTab === 'Created' ? (
                    <Text>Content for Created tab</Text>
                ) : (
                    <Text>Content for Saved tab</Text>
                )}
            </View>

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    coverContainer: {
        marginBottom: 50,
    },
    coverImage: {
        width: '100%',
        height: 200,
    },
    profileImageContainer: {
        position: 'absolute',
        left: '50%',
        top: 150,
        transform: [{ translateX: -40 }],
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userInfoSection: {
        alignItems: 'center',
        marginTop: -10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userCity: {
        fontSize: 14,
    },
    userStats: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    statText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    dot: {
        fontSize: 16,
        marginHorizontal: 6,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    editButton: {
        backgroundColor: '#489fb5',
    },
    addFriendsButton: {
        backgroundColor: '#ddd',
    },
    buttonText: {
        color: 'white',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#489fb5',
    },
    tabText: {
        color: 'gray',
    },
    activeTabText: {
        color: '#489fb5',
        fontWeight: 'bold',
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AccountScreen;
