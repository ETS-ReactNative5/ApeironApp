import React, { Component } from "react";
import Zenska from "../static/zenska-obicna.png";
import Muska from "../static/naslovna-duks.png";
import Hat from "../images/hat.jpg";
import Icon from 'react-native-vector-icons/Entypo';

import {
	StyleSheet,
	Text,
	View,
	StatusBar ,
	Button,
	TextInput,
    TouchableOpacity,
  Image,
  ScrollView
  } from 'react-native';
import { Redirect } from "react-router-dom";
class TShirts extends Component {
    state = {
		redirectToWomen: false,
		redirectToMen: false,
		redirectToWomenOver: false,
		redirectToMenOver: false,
		unauthorizedRedirect: false,
        redirectToHats: false,
	};

	handleImgClick = (imgNum) => {
		if (imgNum === 1) 	this.props.navigation.navigate('TShirts')
		else if(imgNum ===2) this.props.navigation.navigate('Hoodies')
        else  this.props.navigation.navigate('Hats')
	};

	handleImgMouseOver = (imgNum) => {
		if (imgNum === 1) this.props.navigation.navigate('Hoodies')
		else this.setState({ redirectToMenOver: true });
	};

	handleImgMouseOut = (imgNum) => {
		if (imgNum === 1) this.props.navigation.navigate('Hats')
		else this.setState({ redirectToMenOver: false });
	};
	render() {
	
      
		if (this.state.unauthorizedRedirect) return <Redirect push to="/unauthorized" />;
		return (
				<View style={styles.c} >
			
				<ScrollView >
						<View style={styles.container}>
								<View>
                                <TouchableOpacity onPress={() => this.handleImgClick(1)}>
									<Image style={styles.menu} source={Zenska}  	 />
                                    </TouchableOpacity>
								</View>
								<View style={styles.loginText}>
									<Text>T-Shirts</Text>
								</View>
							
							
								<View>
                                <TouchableOpacity onPress={() => this.handleImgClick(2)}>
									<Image style={styles.menu}  source={Muska} />
                                    </TouchableOpacity>
								</View>
								<View style={styles.loginText}>
									<Text>Hoodies</Text>
								</View>
							
                          
								<View>
                                <TouchableOpacity onPress={() => this.handleImgClick(3)}>
									<Image style={styles.menu} source={Hat}  />
                                    </TouchableOpacity>
								</View>
								<View style={styles.loginText}>
									<Text>Hats</Text>
								</View>
							
							
				</View>
				</ScrollView>
				</View>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		
		marginTop: 30,
	  },
	  c: {
		backgroundColor: "#fff",
		
	  },
	  menu: {
		alignItems: "center",
		marginLeft: 80,
	
	  },
	  loginText: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 160,
	  }, 
	
});


export default TShirts;
