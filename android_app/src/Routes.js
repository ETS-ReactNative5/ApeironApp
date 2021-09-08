import React, { Component } from 'react';
import { Button, View, TouchableOpacity } from 'react-native';
import { Router, Scene } from "react-native-router-flux";import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import Login from './pages/Login';
import Signup from './pages/Signup';
import { NavigationContainer } from '@react-navigation/native';



class Routes extends Component{
    handleLogin(){
       
    }

    render() {
        
        return (
            <View></View>
   
     
        );
    }
    
}
export default Routes