import React, { Component } from "react";
import Zenska from "../static/zenska-obicna.png";
import Muska from "../static/naslovna-muska-obicna.png";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
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
	};

	handleImgClick = (imgNum) => {
		if (imgNum === 1) 	this.props.navigation.navigate('TShirtsWomen')
		else 	this.props.navigation.navigate('TShirtsMen')
	}

	handleImgMouseOver = (imgNum) => {
		if (imgNum === 1) this.setState({ redirectToWomenOver: true });
		else this.setState({ redirectToMenOver: true });
	};

	handleImgMouseOut = (imgNum) => {
		if (imgNum === 1) this.setState({ redirectToWomenOver: false });
		else this.setState({ redirectToMenOver: false });
	};
	render() {

		return (
			<View style={styles.container}>
				<ScrollView>
				<View>
					<View>
						<TouchableOpacity width={170} onPress={() => this.handleImgClick(1)}>
							<Image style={styles.tinyLogo} className="img-fluid" source={Zenska} width={170} />
						</TouchableOpacity>
					</View>


					<View style={styles.loginText}>
						<Text>Women T-Shirts</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity width={170} onPress={() => this.handleImgClick(2)}>
						<Image  style={styles.tinyLogo} className="img-fluid" source={Muska} width={170} />
					</TouchableOpacity>
				</View>

				<View style={styles.loginText}>
					<Text>Men T-Shirts</Text>
				</View>
				</ScrollView>
			</View>


		);
	}
}

export default TShirts;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	loginText: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 30,
	},
	tinyLogo: {
		marginTop: 70,
		width: 200,
		height: 200,
	  },
});

