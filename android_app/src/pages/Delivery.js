import React, { Component } from "react";

import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
	Image,
	Table,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import Axios from "axios";
import SyncStorage from 'sync-storage';
import { BASE_URL } from "../../constants.js";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";
import getAuthHeader from "../../GetHeader";
import ModalDialog from "../components/ModalDialog";

import { DataTable } from 'react-native-paper';
class Delivery extends Component {
	state = {
		tshirts: [],
		formShowed: false,
		name: "",
		city: "",
		gradeFrom: "",
		gradeTo: "",
		distanceFrom: "",
		distanceTo: "",
		showingSearched: false,
		showingSorted: false,
		currentLatitude: null,
		currentLongitude: null,
		sortIndicator: 0,
		redirect: false,
		redirectUrl: "",
		showOrderModal: false,
		handleOrderModalClose: false,
		shirt: "",
		selectedColor: "",
		showedColors: [],
		colors: [],
		selectedSize: "",
		showedSizes: [],
		sizes: [],
		openModal: false,


	};

	hasRole = (reqRole) => {
		let roles = JSON.parse(SyncStorage.get("keyRole"));

		if (roles === null) return false;

		if (reqRole === "*") return true;

		for (let role of roles) {
			if (role === reqRole) return true;
		}
		return false;
	};

	handleNameChange = (event) => {
		this.setState({ name: event.nativeEvent.text });
	};
	handleModalClose = () => {
		this.setState({ openModal: false });

	};


	componentDidMount() {
		if (!this.hasRole("ROLE_ADMIN")) {
			this.setState({ redirect: true });
		} else {
			Axios.get(BASE_URL + "/api/users/delivery", { headers: { Authorization: getAuthHeader() } })
				.then((res) => {
					this.setState({ tshirts: res.data });
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});

		}
	}

	hangleFormToogle = () => {
		this.setState({ formShowed: !this.state.formShowed });
	};

	handleDelete = (e,id) => {
		Axios.get(BASE_URL + "/api/users/delete/" + id,{ headers: { Authorization: getAuthHeader() }  })
			.then((res) => {
				
				alert("You have successfuly removed courier")
		
			})
			.catch((err) => {
				alert("You have successfuly removed courier")
			});

	};


	handleGradeFromChange = (event) => {
		if (event.nativeEvent.text < 0) this.setState({ gradeFrom: 0 });
		else this.setState({ gradeFrom: event.nativeEvent.text });
	};

	handleGradeToChange = (event) => {
		if (event.nativeEvent.text > 5) this.setState({ gradeTo: 5 });
		else this.setState({ gradeTo: event.nativeEvent.text });
	};

	handleDistanceFromChange = (event) => {
		this.setState({ distanceFrom: event.nativeEvent.text });
	};

	handleDistanceToChange = (event) => {
		this.setState({ distanceTo: event.nativeEvent.text });
	};

	handleCityChange = (event) => {
		this.setState({ city: event.nativeEvent.text });
	};



	handleClickOnPharmacy = (id) => {
		this.setState({ shirt: id });
		this.setState({ showOrderModal: true });
		this.setState({ colors: id.colors });

	};

	handleOrderModalClose = () => {
		this.setState({ showOrderModal: false });
	};

	handleColorChange = (e) => {

		let u = [];
		this.setState({ selectedColor: event.nativeEvent.text }, () => {
			console.log(this.state);
		});
		this.state.colors.forEach((chain) => {
			if (chain.color === e.target.value) {
				u.push(chain.sizes);
			}
		});


		this.state.sizes = u;
		this.setState({ sizes: u });
		this.setState({ showedSizes: u });
		this.changeEndEntityChain(e.target.value);
	};

	changeEndEntityChain = (e) => {
		if (e === "") {
			this.setState({ showedColors: this.state.colors });
		} else {
			let u = [];
			this.state.colors.forEach((chain) => {
				if (chain.color !== e) {
					u.push(chain);
				}
			});

			this.setState({ showedColors: u });
		}
	};

	handleSizeChange = (e) => {
		this.setState({ selectedSize: event.nativeEvent.text }, () => {
			console.log(this.state);
		});
		this.changeEndEntitySizeChain(e.target.value);
	};

	changeEndEntitySizeChain = (e) => {
		if (e === "") {
			this.setState({ showedSizes: this.state.sizes });
		} else {
			let u = [];
			this.state.sizes.forEach((chain) => {
				if (chain.size !== e) {
					u.push(chain);
				}
			});

			this.setState({ showedSizes: u });
		}
	};


	render() {

		return (
			<ScrollView>
			<View  style={styles.container}>

				<View>


					<DataTable  >
						{this.state.tshirts.map((pharmacy) => (

							<View key={pharmacy.company}>
								<View>
									<Text  style={{ fontWeight: 'bold' }}>Company name: </Text>
									<Text 	style={styles.inputView}>{pharmacy.company}</Text>
								</View>
								<View>
									<Text  style={{ fontWeight: 'bold' }}>Phone: </Text>
									<Text 	style={styles.inputView}> {pharmacy.phoneNumber}</Text>
								</View>
								<View>
									<Text  style={{ fontWeight: 'bold' }}>Address: </Text>
									<Text 	style={styles.inputView}> {pharmacy.address.city}, {pharmacy.address.country}, {pharmacy.address.street}</Text>
								</View>

								{this.hasRole("ROLE_ADMIN") && <View >
								<TouchableHighlight
										style={{
											height: 40,
											borderRadius: 80,
											marginTop: 10,
											marginBottom: 30
										}}>
									<Button
										
										onPress={(e) => this.handleDelete(e, pharmacy.id)}
										className="btn btn-primary btn-xl"
										id="sendMessageButton"
										type="button"
										title="Delete"
									>
									</Button>
									</TouchableHighlight>
									</View>}
							</View>

						))}
					</	DataTable >
				</View>
			


			</View>
			
</ScrollView>
		);
	}
}

export default Delivery;

const styles = StyleSheet.create({
	container: {
		marginLeft: 30,
		marginRight: 30,
		marginTop: 50
	},
	text: {
		fontSize: 16
	},
	signupText: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 16
	},
	signupButton: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500'
	},
	inputView: {
		backgroundColor: "#D3D3D3",
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
		color: "black"
	},
	google: {
		borderRadius: 30,
		marginBottom: 50
	}
});

