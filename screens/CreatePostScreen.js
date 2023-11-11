import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const CreatePostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const selectMedia = () => {
    const options = {
      mediaType: 'photo', // 'photo' or 'video'
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setSelectedMedia(source);
      }
    });
  };

  const handleSubmit = async () => {
    // Handle the submission of the post text and the selected media
    console.log(postText, selectedMedia);
    // After submission, you might want to navigate back to the feed
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Create a New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={postText}
        onChangeText={setPostText}
      />
      <Button title="Select Media" onPress={selectMedia} />
      <Button title="Post" onPress={handleSubmit} />
      {/* Display selected media if any */}
      {selectedMedia && (
        <Text>Media selected - you can add an image component to display it</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Set width to fit your design
  },
});

export default CreatePostScreen;
