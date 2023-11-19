import React, { useState } from 'react';
import { StatusBar, View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';



const VoteButtons = ({ postId }) => {
    const [vote, setVote] = useState(0); // 0 for no vote, 1 for upvote, -1 for downvote

    const handleUpvote = () => {
        setVote(vote === 1 ? 0 : 1); // Toggle upvote
        // Add logic to update the vote in your backend or state
    };

    const handleDownvote = () => {
        setVote(vote === -1 ? 0 : -1); // Toggle downvote
        // Add logic to update the vote in your backend or state
    };

    return (
        <View style={styles.voteContainer}>
            <TouchableOpacity onPress={handleUpvote}>
                <Text style={[styles.voteButton, vote === 1 && styles.upvoted]}>↑</Text>
            </TouchableOpacity>
            <Text style={styles.voteCount}>{Math.abs(vote)}</Text>
            <View style={styles.separator} />
            <TouchableOpacity onPress={handleDownvote}>
                <Text style={[styles.voteButton, vote === -1 && styles.downvoted]}>↓</Text>
            </TouchableOpacity>
        </View>
    );
};

const FeedScreen = ({ navigation }) => {
    const [isMuted, setIsMuted] = useState(true); // Video starts muted

    const [selectedCity, setSelectedCity] = useState('Charlotte');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filters = [
        { name: 'All', icon: 'globe' }, // Replace 'ios-globe' with the correct icon name
        { name: 'Seasonal', icon: 'leaf' }, // Example icon, replace with your choice
        { name: 'Dates', icon: 'heart' }, // Example icon, replace with your choice
        { name: 'Nights Out', icon: 'moon' }, // Example icon, replace with your choice
        { name: 'Nature', icon: 'flower' }, // Example icon, replace with your choice
        { name: 'Day Trips', icon: 'sunny' }, // Example icon, replace with your choice
        { name: 'Getaways', icon: 'airplane' }, // Example icon, replace with your choice
    ];


    const data = [
        {
            id: '1',
            user: {
                profilePic: require('../assets/profilePic.jpg'),
                username: 'Elias Reyes'
            },
            content: require('../assets/vid1.mp4'),
            contentType: 'video',
            title: 'Sliding Rock',
            location: 'Pisgah National Park',
            description: 'A fun day sliding down the rock!',
            likesCount: 128,
            commentsCount: 32,
            savesCount: 11,
            sharesCount: 7,
            category: 'Nature', // Example category
        },
        // ... add more dummy data as needed
    ];

    // Function to filter posts based on selected filter and search query
    const filteredData = data.filter(post => {
        const filterMatch = selectedFilter === 'All' || post.category === selectedFilter;
        const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return filterMatch && searchMatch;
    });

    const renderFilter = (filter, index) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }} key={filter.name}>
            <TouchableOpacity
                style={styles.filterOption}
                onPress={() => setSelectedFilter(filter.name)}
            >
                <Icon
                    name={filter.icon}
                    size={20}
                    color={selectedFilter === filter.name ? '#489fb5' : 'black'}
                />
                <Text style={selectedFilter === filter.name ? styles.selectedFilterText : styles.filterText}>
                    {filter.name}
                </Text>
            </TouchableOpacity>
            {filter.name === 'All' && <View style={styles.separatorLine} />}
        </View>
    );
    


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.title}>Discover</Text>
                <TouchableOpacity style={styles.cityPicker} onPress={() => setModalVisible(true)}>
                    <Text>Cities</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchSection}>
                <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#000" // Change placeholder text color
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View style={styles.filterWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
{filters.map((filter, index) => renderFilter(filter, index))}
                </ScrollView>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen', { post: item })}>
                        <View style={styles.post}>
                            <View style={styles.postHeader}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.user.profilePic} style={styles.profilePic} />
                                    <Text style={styles.username}>{item.user.username}</Text>
                                </View>
                                <VoteButtons postId={item.id} />
                            </View>
                            {item.contentType === 'photo' ? (
                                <Image source={item.content} style={styles.content} />
                            ) : (
                                <View>
                                    <Video
                                        source={item.content}
                                        style={styles.content}
                                        resizeMode="cover"
                                        muted={isMuted} // Use the state to control the sound
                                        repeat={true} // Optional: if you want the video to loop
                                    />
                                    <TouchableOpacity
                                        style={styles.soundButton}
                                        onPress={() => setIsMuted(!isMuted)}
                                    >
                                        <Icon name={isMuted ? "volume-mute" : "volume-high"} size={20} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postLocation}>{item.location}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />


            {/* City Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Explore a city</Text>
                        <Text style={styles.modalSubtitle}>Explore these cities with the help of locals</Text>
                        <TouchableOpacity
                            style={styles.cityOption}
                            onPress={() => { setSelectedCity('Charlotte'); setModalVisible(false); }}
                        >
                            <Text>Charlotte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cityOption}
                            onPress={() => { setSelectedCity('Raleigh'); setModalVisible(false); }}
                        >
                            <Text>Raleigh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cityOption}
                            onPress={() => { setSelectedCity('Wilmington'); setModalVisible(false); }}
                        >
                            <Text>Wilmington</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    soundButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
        padding: 8,
        borderRadius: 15,
    },
    filterIcon: {
        width: 20, // Adjust size as needed
        height: 20, // Adjust size as needed
        marginRight: 5, // Space between icon and text
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Adjusted for layout
        marginBottom: 10,
    },
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        padding: 5,
    },
    voteButton: {
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 5,
    },
    upvoted: {
        color: 'green',
    },
    downvoted: {
        color: 'red',
    },
    voteCount: {
        paddingHorizontal: 5,
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: '100%',
        width: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
    },
    container: {
        flex: 1,
        paddingTop: 40, // Adjust this value to add space at the top of the screen
        paddingHorizontal: 20, // This will add padding on the sides
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20, // Add top margin to lower the header
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
    },
    cityPicker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        color: '#000', // Change input text color
    },
    post: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
    },
    dimBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // This will create a semi-transparent black background
    },
    modalView: {
        height: '75%', // This will make the modal take up 75% of the screen height
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        textAlign: 'center', // This will center the text
        marginBottom: 10, // Add some margin for spacing
    },
    modalSubtitle: {
        fontSize: 18,
        textAlign: 'center', // This will center the text
        marginBottom: 20, // Add some margin for spacing
    },
    cityOption: {
        padding: 10, // Add some padding for better touch experience
        borderBottomWidth: 1, // This will add a gray line under each city option
        borderBottomColor: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent background
    },
    filterContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,  // Provide a specific value here
    },
    filterOption: {
        paddingHorizontal: 15,
        paddingVertical: 10, // Adjusted padding
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
    },
    selectedFilterText: {
        color: '#489fb5',
        lineHeight: 26, // Adjusted line height
        fontSize: 16, // Adjust font size if necessary
    },
    filterText: {
        color: 'black',
        lineHeight: 26, // Adjusted line height
        fontSize: 16, // Adjust font size if necessary
    },

    filterWrapper: {
        // Removed fixed height to allow content to define its space
        marginBottom: 10,
        paddingHorizontal: 10, // Add padding if needed
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
        height: 425, // Adjust based on your preference
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    postTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 20,
    },
    postLocation: {
        fontSize: 16,
    },
    separatorLine: {
        height: '100%', // This will make the separator line as tall as its parent
        width: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    


});

export default FeedScreen;
