import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import Order from "../components/Order";
import getAuthHeader from "../../GetHeader";
import ModalDialog from "../components/ModalDialog";

import { DataTable } from 'react-native-paper';
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
import SyncStorage from 'sync-storage';
class QRCodes extends Component {
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
		window.location.reload();
	};
	getCurrentCoords = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					currentLatitude: position.coords.latitude,
					currentLongitude: position.coords.longitude,
				});
			});
		}
	};

	componentDidMount() {
		
		if (this.hasRole("ROLE_ADMIN")) {
			Axios.get(BASE_URL + "/api/reservations/getQR")
			.then((res) => {
				this.setState({ tshirts: res.data });
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
        }

		else if (this.hasRole("ROLE_DELIVERY")) {
			Axios.get(BASE_URL + "/api/reservations/getQRCourier" ,{headers: { Authorization: getAuthHeader() } })
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
		Axios.get(BASE_URL + "/api/items/delete/" + id)
			.then((res) => {
				
				this.setState({ openModal: true });
		
			})
			.catch((err) => {
				console.log(err);
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
		this.setState({ selectedColor: e.nativeEvent.text }, () => {
			console.log(this.state);
		});
		this.state.colors.forEach((chain) => {
			if (chain.color === e.nativeEvent.text) {
				u.push(chain.sizes);
			}
		});


		this.state.sizes = u;
		this.setState({ sizes: u });
		this.setState({ showedSizes: u });
		this.changeEndEntityChain(e.nativeEvent.text);
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
		this.setState({ selectedSize: e.nativeEvent.text }, () => {
			console.log(this.state);
		});
		this.changeEndEntitySizeChain(e.nativeEvent.text);
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

			<View>
				<View >

					
					<DataTable  >
						
							{this.state.tshirts.map((pharmacy) => (
								<View key={pharmacy.user}>
								
										<View>
											<Text>User: </Text><Text> {pharmacy.user}</Text>
										</View>
										
										<Image  style={styles.image}  source={{uri: pharmacy.files[0]} } />
									
								
								
								</View>
							))}
						
						</DataTable  >
				</View>
				<ModalDialog
                    show={this.state.openModal}
                    onCloseModal={this.handleModalClose}
                    header="Success"
                    text="You have successfully removed the item."
                />

				
				</View>
		);
	}
}

export default QRCodes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	loginText: {
		flex: 1,
		padding: 3,
		marginLeft: 50,
		fontWeight: "bold"
	},
	image: {
		marginTop: 20,
		marginLeft: 50,
		width: 300,
		height: 300,
	},
	loginBtn: {

		borderRadius: 25,

	},

});
