import * as React from 'react';
import { View ,StyleSheet,} from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation } from '@react-navigation/native'




const Menuu = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
 const  handleLogin = () => {
    navigation.navigate('AddItem')
 
   };
  return (
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} style={{ marginLeft: 230 }}> <Icon name="menu" color="black" size={30} /></Button>}>
           
          <Menu.Item onPress={()=>{navigation.navigate('HomePage')}} title="Our products" />
          <Divider />
          <View>
            
          <Menu.Item onPress={()=>{handleLogin()}} title="Item 2" /></View>
          <Divider />
          <Menu.Item onPress={()=>{handleLogin()}} title="Item 3" />
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