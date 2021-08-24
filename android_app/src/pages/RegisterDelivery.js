

import React, { Component } from 'react';
import ModalDialog from "../components/ModalDialog";
import { BASE_URL } from "../../constants.js";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	TextInput,
	Button,
	FlatList,
} from 'react-native';
import Axios from "axios";
import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
const API_KEY = 'AIzaSyAsno5WRMrrU_XX-ur8CBRtndECG-0kAfs';
export default class Signup extends Component {
	state = {
		searchKeyword: '',
		searchResults: [],
		isShowingResults: false,
		errorHeader: "",
		errorMessage: "",
		hiddenErrorAlert: true,
		email: "",
		password: "",
		repeatPassword: "",
		name: "",
		surname: "",
		address: "",
		phoneNumber: "",
		emailError: false,
		passwordError: false,
		repeatPasswordError: false,
		repeatPasswordSameError: false,
		nameError: false,
		surnameError: false,
		addressError: false,
		phoneError: false,
		emailNotValid: false,
		addressNotFoundError: false,
		openModal: false,
		openModal2: false,
		coords: [],
		location: "",
		longitude: "",
		latitute: "",
		street : "",
		 city: "",
		country: "",
		latitude: "",
		longitude: "",
	};
	constructor(props) {
		super(props);
		this.searchKeyword = React.createRef();
	}


	searchLocation = async (text) => {
		this.setState({ searchKeyword: text });
		Axios
			.request({
				method: 'post',
				url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.searchKeyword}`,
			})
			.then((response) => {
				console.log(response.data.predictions);
				this.setState({
					searchResults: response.data.predictions,
					isShowingResults: true,
				});
			})
			.catch((e) => {
				console.log(e.response);
			});
	};

	goBack() {
		Actions.pop();
	}



	handleEmailChange = (event) => {
		this.setState({ email: event.nativeEvent.text });

	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.nativeEvent.text });
	};

	handleRepeatPasswordChange = (event) => {
		this.setState({ repeatPassword: event.nativeEvent.text });
	};

	handleNameChange = (event) => {
		this.setState({ name: event.nativeEvent.text });
	};

	handleSurnameChange = (event) => {
		this.setState({ surname: event.nativeEvent.text });
	};

	handleAddressChange = (event) => {
		this.setState({ address: event.nativeEvent.text });
	};

	handlePhoneNumberChange = (event) => {
		this.setState({ phoneNumber: event.nativeEvent.text });
	};

	validateForm = (userDTO) => {
		this.setState({
			emailError: false,
			emailNotValid: false,
			nameError: false,
			surnameError: false,
			addressError: false,
			addressNotFoundError: false,
			phoneError: false,
			passwordError: false,
			repeatPasswordError: false,
			repeatPasswordSameError: false,
		});

		if (userDTO.email === "") {
			this.setState({ emailError: true });
			return false;
		} else if (!userDTO.email.includes("@")) {
			this.setState({ emailNotValid: true });
			return false;
		} else if (userDTO.firstname === "") {
			this.setState({ nameError: true });
			return false;
		} else if (userDTO.surname === "") {
			this.setState({ surnameError: true });
			return false;
		} else if (this.searchKeyword === null) {
			this.setState({ addressError: true });
			return false;
		} else if (userDTO.phonenumber === "") {
			this.setState({ phoneError: true });
			return false;
		} else if (userDTO.password === "") {
			this.setState({ passwordError: true });
			return false;
		} else if (this.state.repeatPassword === "") {
			this.setState({ repeatPasswordError: true });
			return false;
		} else if (userDTO.password !== this.state.repeatPassword) {
			this.setState({ repeatPasswordSameError: true });
			return false;
		}
		return true;
	};

	handleModalClose = () => {
		this.setState({ openModal: false, redirect: true });
	};

	hhh = (event) => {
		this.setState({ openModal: true });

	}
	handleSignUp = () => {
		if (!this.hasRole("ROLE_ADMIN")) {
			this.setState({ redirect: true });
		} else {
		if (this.searchKeyword === null) {
			this.setState({ addressError: true });
			return false;
		}
		else {

			let stree = this.state.street
			let countr = this.state.country
			let cit = this.state.city
			let long = this.state.longitude
			let lat = this.state.latitute

					let userDTO = {
						email: this.state.email,
						firstname: this.state.name,
						surname: this.state.surname,
						address: { stree, countr, cit, lat, long },
						phonenumber: this.state.phoneNumber,
						password: this.state.password,
					};

					if (this.validateForm(userDTO)) {
					
						

						Axios.post(BASE_URL + "/api/auth/signupDelivery", userDTO, { validateStatus: () => true, headers: { Authorization: getAuthHeader() }  })
								.then((res) => {
									if (res.status === 409) {
										this.setState({
											errorHeader: "Resource conflict!",
											errorMessyage: "Email already exist.",
											hiddenErrorAlert: false,
										});
									} else if (res.status === 500) {
										this.setState({ errorHeader: "Error", errorMessage: "User with that email already exists.", hiddenErrorAlert: false });
									} else {
										console.log("Success");
										this.setState({ openModal2: true });
									}

								})
								.catch((err) => {
									console.log(err);

								});
						
					}
			
		}
	}
	};


	handleCloseAlert = () => {
		this.setState({ hiddenErrorAlert: true });
	};

	render() {
		return (

			<View className="container" style={{ marginTop: 2 }}>



				<View className="row section-design">
					<View className="col-lg-8 mx-auto">


						<View className="control-group">
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<Text>Email address:</Text>
								<TextInput
									placeholder="Email address"
									className="form-control"
									id="email"
									type="text"
									onChange={this.handleEmailChange}
									value={this.state.email}
								/>
							</View>
							{this.state.emailError && <View className="text-danger" >
								<Text>Email address must be entered.</Text>
							</View>}
							{this.state.emailNotValid && <View className="text-danger" >
								<Text>Email address is not valid.</Text>
							</View>}
						</View>
						<View className="control-group">
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<Text>Company name:</Text>
								<TextInput
									placeholder="Company name"
									class="form-control"
									type="text"
									id="name"
									onChange={this.handleNameChange}
									value={this.state.name}
								/>
							</View>
							{this.state.nameError && <View className="text-danger" >
								<Text>Company name must be entered.</Text>
							</View>}
						</View>
					


						<Text>Address:</Text>
						<View>

						<View className="form-group">
							<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.hhh}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Click to add address"
							>

							</Button>
						</View>

						</View>
						{this.state.addressError && <View className="text-danger" hidden={this.state.addressError}>
							<Text>Address must be entered.</Text>

						</View>}
						{this.state.addressNotFoundError && <View className="text-danger" >
							<Text>Sorry. Address not found. Try different one.</Text>
						</View>}

						<View className="control-group">
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<Text>Phone number:</Text>
								<TextInput
									placeholder="Phone number"

									class="form-control"
									id="phone"
									type="text"
									onChange={this.handlePhoneNumberChange}
									value={this.state.phoneNumber}
								/>
							</View>
							{this.state.phoneError && <View className="text-danger">
								<Text>Phone number must be entered.</Text>
							</View>}
						</View>
						<View className="control-group">
							<Text>Password:</Text>
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<TextInput
									placeholder="Password"
									class="form-control"
									type="password"
									onChange={this.handlePasswordChange}
									value={this.state.password}
								/>
							</View>
							{this.state.passwordError && <View className="text-danger" >
								<Text>Password must be entered.</Text>
							</View>}
						</View>
						<View className="control-group">
							<Text>Repeat password:</Text>
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<TextInput
									placeholder="Repeat password"
									class="form-control"
									type="password"
									onChange={this.handleRepeatPasswordChange}
									value={this.state.repeatPassword}
								/>
							</View>
							{this.state.repeatPasswordError && <View className="text-danger" >
								<Text>Repeat password must be entered.</Text>
							</View>}
							{this.state.repeatPasswordSameError && <View className="text-danger">
								<Text>Passwords are not the same.</Text>
							</View>}
						</View>
						<Modal isVisible={this.state.openModal}>
							<View style={{flex: 1}}>
							<GooglePlacesAutocomplete
								fetchDetails={true}
								placeholder='Search'
								onPress={(data, details = null) => {
									console.log(details.formatted_address,details.getPlace, details.getCountry )
									this.setState({	street: details.formatted_address,
									 city: details.getPlace,
										country: details.getCountry,
										latitute :  details.geometry.location.lat,
										longitude:  details.geometry.location.lng})
								}}
								query={{
									key: 'AIzaSyAsno5WRMrrU_XX-ur8CBRtndECG-0kAfs',
									language: 'en',
								}}
								styles={{
									textInputContainer: {
										backgroundColor: 'grey',
									},
									textInput: {
										height: 38,
										color: '#5d5d5d',
										fontSize: 16,
									}, predefinedPlacesDescription: {
										color: '#1faadb',
									},
								}}

							/>
												<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.handleModalClose}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Close"
							>

							</Button>
							</View>
						</Modal >


						<Modal isVisible={this.state.openModal2}>
							<Text>You have successfuly registrated</Text>
							<View >
							
												<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.handleModalClose}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Close"
							>

							</Button>
							</View>
						</Modal >
						<View >
							<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.handleSignUp}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Register courier"
							>

							</Button>
						</View>

					</View>
				</View>

			</View>


		)
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#455a64',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	signupTextCont: {
		flexGrow: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row'
	},
	signupText: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 16
	},
	signupButton: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500'
	}
});

