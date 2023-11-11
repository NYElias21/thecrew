import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const PostDetailScreen = ({ route, navigation }) => {
    const { post } = route.params;
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status
    const [progress, setProgress] = useState(0); // Progress of the video


    const handleFollowPress = () => {
        setIsFollowing(!isFollowing);
    };

    const goBack = () => {
        navigation.goBack(); // Use the navigation prop to go back
    };

    const openInfo = () => {
        setInfoModalVisible(true); // Use the existing state to show the modal
    };

    return (
        <View style={styles.container}>
            {post.contentType === 'photo' ? (
                <Image source={post.content} style={styles.content} />
            ) : (
                <>
                <Video
                    source={post.content}
                    style={styles.fullScreenVideo}
                    resizeMode="cover"
                    controls={true}
                    autoplay={true}
                    onProgress={({ currentTime, seekableDuration }) => {
                        setProgress(currentTime / seekableDuration);
                    }}
                />
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
                <View style={styles.blackSpace} />
            </>
            )}

            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Icon name="arrow-back" size={30} color="white" />
            </TouchableOpacity>

            {/* Info Icon */}
            <TouchableOpacity style={styles.infoButton} onPress={openInfo}>
                <Icon name="information-circle" size={30} color="white" />
            </TouchableOpacity>

            {/* Information Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={infoModalVisible}
                onRequestClose={() => {
                    setInfoModalVisible(!infoModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{post.title}</Text>
                        <Text style={styles.modalSubtitle}>{post.location}</Text>
                        <TouchableOpacity
                            style={styles.cityOption}
                            onPress={() => setInfoModalVisible(false)}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.overlayContent}>
                {/* Title and Location Box */}
                <View style={styles.titleLocationContainer}>
                    <Icon name="location-sharp" size={24} color="white" style={styles.locationIcon} />
                    <View style={styles.titleAndLocation}>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.location}>{post.location}</Text>
                    </View>
                </View>

                {/* User Name */}
                <Text style={styles.usernameOverlay}>{post.user.username}</Text>

                {/* Short Description */}
                <Text style={styles.description}>{post.description}</Text>

                {/* Right-side Icons */}
                <View style={styles.rightIcons}>
                    {/* Profile Image */}
                    <TouchableOpacity style={styles.profileImageContainer} onPress={handleFollowPress}>
                        <Image source={post.user.profilePic} style={styles.profileImage} />
                        <View style={styles.plusIconContainer}>
                            <Icon name={isFollowing ? "checkmark" : "add"} size={16} color="white" />
                        </View>
                    </TouchableOpacity>

                    {/* Like Button */}
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="heart" size={30} color="white" />
                        <Text style={styles.iconText}>{post.likesCount}</Text>
                    </TouchableOpacity>

                    {/* Comment Button */}
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="chatbubble-ellipses" size={30} color="white" />
                        <Text style={styles.iconText}>{post.commentsCount}</Text>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="bookmark" size={30} color="white" />
                        <Text style={styles.iconText}>{post.savesCount}</Text>
                    </TouchableOpacity>

                    {/* Share Button */}
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="arrow-redo" size={30} color="white" />
                        <Text style={styles.iconText}>{post.sharesCount}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        width: '100%',
        height: 350,
    },
    fullScreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 45, // Space for the progress bar
    },
    overlayContent: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        paddingTop: 50, // Add padding at the top for the icons

    },
    titleLocationContainer: {
        flexDirection: 'row', // Change to 'row' to place items side by side
        alignItems: 'center', // Center items vertically
        backgroundColor: 'rgba(33, 33, 33, 0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 100,
        left: 10,
    },
    titleAndLocation: {
        // marginLeft is not needed anymore since flexDirection is now 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 3, // Space between title and location
    },
    location: {
        fontSize: 14,
        color: 'white',
        // Remove flexShrink if it's set, to prevent wrapping
    },
    locationIcon: {
        // Remove the absolute positioning and vertical centering
        marginRight: 8, // Add some margin to the right of the icon
    },

    usernameOverlay: {
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        bottom: 80,
        left: 10,
    },
    description: {
        color: 'white',
        position: 'absolute',
        bottom: 60,
        left: 10,
        right: 10,
    },
    rightIcons: {
        position: 'absolute',
        right: 10,
        bottom: 100, // Adjusted to align with the titleLocationContainer
        alignItems: 'center',
    },
    profileImageContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    plusIconContainer: {
        position: 'absolute',
        right: '50%', // Center horizontally
        bottom: -12, // Half outside the bottom of the profile image
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'red', // Change to your desired color
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: 12 }], // Adjust horizontal position by half the width of the container
    },
    iconButton: {
        marginBottom: 10,
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalView: {
        height: '75%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    cityOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    progressBarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 45, // 40 pixels from the bottom
        height: 5, // Height of the progress bar
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Light background for the progress bar
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'darkblue', // Color for the progress indicator
    },
    blackSpace: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 45, // Height of the black space under the progress bar
        backgroundColor: 'black', // Black background
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 10, // Adjust for iOS status bar height
        left: 10,
        zIndex: 3,
    },
    
    infoButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 10, // Adjust for iOS status bar height
        right: 10,
        zIndex: 3,
    },
    // ... Add any other styles that you might have previously defined
});

export default PostDetailScreen;
