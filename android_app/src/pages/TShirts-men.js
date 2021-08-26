import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import PharmacyLogo from "./../static/naslovna-duks.png";

import { Redirect } from "react-router-dom";
import Order from "../components/Order";
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
import ModalDialog from "./../components/ModalDialog";
class TShirtsMen extends Component {
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
		this.setState({ showOrderModal: false });
	};


	componentDidMount() {

		Axios.get(BASE_URL + "/api/items/tshirt-men")
			.then((res) => {
				this.setState({ tshirts: res.data });
console.log(res.data)
			})
			.catch((err) => {
				console.log(err);
			});

	}

	hangleFormToogle = () => {
		this.setState({ formShowed: !this.state.formShowed });
	};

	handleDelete = (e, id) => {
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

		this.setState({ selectedColor: e }, () => {
		});
		this.state.colors.forEach((chain) => {
			if (chain.color == e) {
				chain.sizes.forEach((s) => {
					console.log(s);

					this.state.sizes.push(s)
					this.state.showedSizes.push(s)
				});
			}
		});

		this.changeEndEntityChain(e);
	};

	changeEndEntityChain = (e) => {
		console.log(this.state.sizes)
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
		this.setState({ selectedSize: e }, () => {
			console.log(e);
		});
		this.changeEndEntitySizeChain(e);
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
		if (this.state.redirect) return <Redirect push to={this.state.redirectUrl} />;

		return (

			<View className="container" style={{ marginTop: 10 }}>
				<ScrollView>
					<Order isVisible={this.state.showOrderModal}

						handleModalClose={this.handleModalClose}
						buttonName="Send reservation"
						header="Make new reservation"
						onCloseModal={this.handleOrderModalClose}
						handleColorChange={this.handleColorChange}
						handleSizeChange={this.handleSizeChange}
						shirt={this.state.shirt}
						showedColors={this.state.colors}
						selectedColor={this.state.selectedColor}
						showedSizes={this.state.sizes}
						selectedSize={this.state.selectedSize}
					/>



					<DataTable >

						{this.state.tshirts.map((pharmacy) => (


							<View key={pharmacy.id}>
								<Image style={styles.image} source={{ uri: pharmacy.files[0] }} />
								<View style={styles.loginText}>
									<Text style={{ fontWeight: 'bold' }} >Name: </Text><Text>{pharmacy.name} </Text>
								</View>
								<View style={styles.loginText}>
									<Text style={{ fontWeight: 'bold' }}>Price:  </Text><Text> {pharmacy.price}</Text>
								</View>
								<View key={pharmacy.id}>
									<View style={styles.loginText}>
										<Text style={{ fontWeight: 'bold' }}>Available colors: </Text>
										{pharmacy.colors.map((color) => (
											<View key={color.color}><Text key={color.color}> {color.color}</Text>

												{color.sizes.map((size) => (
													<View key={size.size}>
														<DataTable.Cell key={size.size}> <Text>{size.size} </Text><Text style={{ fontWeight: 'bold' }}>available: </Text><Text>{size.quantity}</Text></DataTable.Cell>
													</View>

												))}

											</View>


										))}
									</View>
								</View>







								{this.hasRole("ROLE_USER") &&

								<View style={styles.loginBtn} >
									<TouchableHighlight
										style={{
											height: 40,
											width: 300,
											borderRadius: 80,
											marginLeft: 50,
											marginRight: 50,
											marginTop: 10
										}}>
										<Button

											color="#88c7dc"
											onPress={() => this.handleClickOnPharmacy(pharmacy)}
											className="btn btn-primary btn-xl"
											id="sendMessageButton"
											type="Button"
											title="Reserve"
										>
										</Button>
									</TouchableHighlight></View>}


									{this.hasRole("ROLE_ADMIN") &&
								<View >
									<TouchableHighlight
										style={{
											height: 40,
											width: 300,
											borderRadius: 80,
											marginLeft: 50,
											marginRight: 50,
											marginTop: 10
										}}>
										<Button
											color="#88c7dc"
											onPress={(e) => this.handleDelete(e, pharmacy.id)}
											className="btn btn-primary btn-xl"
											id="sendMessageButton"
											type="Button"
											title="Delete"
										>
										</Button></TouchableHighlight></View>}
							</View>
						))}

					</DataTable>
				</ScrollView>
			</View>


		);

	}
}

export default TShirtsMen;

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
		height: 200,
	},
	loginBtn: {

		borderRadius: 25,

	},

});

