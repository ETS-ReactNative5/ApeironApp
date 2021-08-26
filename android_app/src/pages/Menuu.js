import * as React from 'react';
import { View ,StyleSheet,} from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation } from '@react-navigation/native'

import SyncStorage from 'sync-storage';



const Menuu = () => {

  hasRole = (reqRole) => {
		let roles = JSON.parse(SyncStorage.get("keyRole"));

		if (roles === null) return false;

		if (reqRole === "*") return true;

		for (let role of roles) {
			if (role === reqRole) return true;
		}
		return false;
	};

  
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
 const  handleLogin = () => {
    navigation.navigate('AddItem')
 
   };

   handleLogout = () => {
		SyncStorage.remove("keyToken");
		SyncStorage.remove("keyRole");
		SyncStorage.remove("expireTime");
    navigation.navigate('Login')
	};
  return (
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} style={{ marginLeft: 230 }}> <Icon name="menu" color="black" size={30} /></Button>}>
           
          <Menu.Item onPress={()=>{navigation.navigate('HomePage')}} title="Our products" />
          <Divider />
          {this.hasRole("ROLE_ADMIN") &&  <View>
            
          <Menu.Item onPress={()=>{navigation.navigate('AddItem')}} title="Add new item" /></View>}
          <Divider />
          
          {!this.hasRole("ROLE_DELIVERY") &&  <View>
          <Menu.Item onPress={()=>{navigation.navigate('AllOrders')}} title="Orders" /></View>}
          <Divider />
          {!this.hasRole("ROLE_USER") && <View>
          <Menu.Item onPress={()=>{navigation.navigate('QRCodes')}} title="QRCodes" /></View>}
          <Divider />
          {this.hasRole("ROLE_ADMIN") &&  <View>
          <Menu.Item onPress={()=>{navigation.navigate('RegisterDelivery')}} title="Register courier" /></View>}
          <Divider />
          
          {this.hasRole("ROLE_ADMIN") && <View>
          <Menu.Item onPress={()=>{navigation.navigate('Delivery')}} title="Couriers" /></View>}
          <Divider />
          
          <View>
          <Menu.Item onPress={()=>{navigation.navigate('Contact')}} title="Contact" /></View>
          <Divider />
          {this.hasRole("ROLE_ADMIN") &&  <View>
          <Menu.Item onPress={()=>{navigation.navigate('Change')}} title="Colors" /></View>}
          <Divider />
          
          {!this.hasRole("ROLE_ADMIN") && <View>
          <Menu.Item onPress={()=>{navigation.navigate('UserProfilePage')}} title="My profile" /></View>}
          <Divider />
          <Menu.Item onPress={()=>{handleLogout()}} title="Logout" />
        </Menu>
      </View>
  );
};



export default Menuu;

const styles = StyleSheet.create({
	container: {
    position: "relative",
	},
})