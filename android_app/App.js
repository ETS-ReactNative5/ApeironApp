
import HomePage from './src/pages/HomePage';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Change from './src/pages/Change';
import AddItem from './src/pages/AddItem';
import Hats from './src/pages/Hats';
import TShirtsWomen from './src/pages/TShirts-women';
import TShirtsMen from './src/pages/TShirts-men';
import TShirts from './src/pages/TShirts';
import Menuu from "./src/pages/Menuu"
import Hoodies from './src/pages/Hoodies';
import UserProfilePage from './src/pages/UserProfilePage';
import Contact from './src/pages/Contact';
import AllOrders from './src/pages/AllOrders';
import Delivery from './src/pages/Delivery';
import QRCodes from './src/pages/QRCodes';
import RegisterDelivery from './src/pages/RegisterDelivery';

import HoodiesWomen from './src/pages/Hoodies-women';
import HoodiesMen from './src/pages/Hoodies-men';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Provider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Login}
          options={{ title: 'Log in' }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomePage"  options={{ headerTitle: (props) =>  <Menuu/>  }} component={HomePage} />
        <Stack.Screen name="Change" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={Change} />
        <Stack.Screen name="AddItem"  options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={AddItem} />
        <Stack.Screen name="TShirtsWomen"  options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={TShirtsWomen} />
        <Stack.Screen name="TShirtsMen"  options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={TShirtsMen} />
        <Stack.Screen name="Hats" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={Hats} />
        <Stack.Screen name="UserProfilePage" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={UserProfilePage} />
        <Stack.Screen name="TShirts" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={TShirts} />
        <Stack.Screen name="Hoodies" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={Hoodies} />
        <Stack.Screen name="AllOrders" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={AllOrders} />
        <Stack.Screen name="Contact" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={Contact} />
        <Stack.Screen name="Delivery" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={Delivery} />
        <Stack.Screen name="QRCodes" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={QRCodes} />
        <Stack.Screen name="RegisterDelivery" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={RegisterDelivery} />
        <Stack.Screen name="HoodiesWomen" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={HoodiesWomen} />
        <Stack.Screen name="HoodiesMen" options={{ headerTitle:  (props) =>  <Menuu {...props} />  }} component={HoodiesMen} />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default MyStack