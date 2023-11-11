import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import FeedScreen from './screens/feedScreen';
import AccountScreen from './screens/accountScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import CreatePostScreen from './screens/CreatePostScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'CreatePost') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} options={{
        tabBarLabel: 'Create Post',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#fefcfb',
            },
            headerTintColor: '#333',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerTintColor: '#333',
          }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
  name="Feed" 
  component={FeedScreen} 
  options={{ headerShown: false }} // This hides the header for FeedScreen
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
