import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
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
    const [selectedCity, setSelectedCity] = useState('Charlotte');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filters = ['All', 'Nature', 'Dates', 'Night Life', 'Budget Friendly'];

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

    const renderFilter = (filter) => (
        <TouchableOpacity
            key={filter}
            style={[styles.filterOption, selectedFilter === filter && styles.selectedFilter]}
            onPress={() => setSelectedFilter(filter)}
        >
            <Text style={selectedFilter === filter ? styles.selectedFilterText : styles.filterText}>
                {filter}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Discover</Text>
                <TouchableOpacity style={styles.cityPicker} onPress={() => setModalVisible(true)}>
                    <Text>Cities</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.filterWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    {filters.map(filter => renderFilter(filter))}
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
                                <Video
                                    source={item.content}
                                    style={styles.content}
                                    resizeMode="cover"
                                    controls={true}
                                />
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
    searchInput: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 20,
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
        marginBottom: 5,  // Adjust this value to reduce the space below the filter container
    },
    filterOption: {
        height: 30,            // Explicitly set the height
        paddingHorizontal: 15,
        paddingVertical: 3,   // Reduce vertical padding
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',  // Center the text vertically
        justifyContent: 'center',
    },
    selectedFilter: {
        backgroundColor: '#489fb5',
    },
    filterText: {
        color: 'black',
        lineHeight: 24,        // Adjust lineHeight to match the height minus padding
    },
    selectedFilterText: {
        color: 'white',
        lineHeight: 24,
    },
    filterWrapper: {
        height: 36,  // This height should match the total height of the filter buttons (height + padding)
        marginBottom: 10,  // Adjust this value to control the space below the filter container
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
        height: 350, // Adjust based on your preference
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    postTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postLocation: {
        fontStyle: 'italic',
    },


});

export default FeedScreen;
