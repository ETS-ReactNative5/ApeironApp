import React, { Component } from 'react';
import ModalDialog from "../components/ModalDialog";
import { BASE_URL } from "../../constants.js";
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import { YMaps, Map } from "react-yandex-maps";
import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
export default class Signup extends Component {
  state = {
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
		emailError: "none",
		passwordError: "none",
		repeatPasswordError: "none",
		repeatPasswordSameError: "none",
		nameError: "none",
		surnameError: "none",
		addressError: "none",
		phoneError: "none",
		emailNotValid: "none",
		addressNotFoundError: "none",
		openModal: false,
		coords: [],
	};
	constructor(props) {
		super(props);
		this.addressInput = React.createRef();
	}
  goBack() {
      Actions.pop();
  }

	onYmapsLoad = (ymaps) => {
		this.ymaps = ymaps;
		new this.ymaps.SuggestView(this.addressInput.current, {
			provider: {
				suggest: (request, options) => this.ymaps.suggest(request),
			},
		});
	};

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
			emailError: "none",
			emailNotValid: "none",
			nameError: "none",
			surnameError: "none",
			addressError: "none",
			addressNotFoundError: "none",
			phoneError: "none",
			passwordError: "none",
			repeatPasswordError: "none",
			repeatPasswordSameError: "none",
		});

		if (userDTO.email === "") {
			this.setState({ emailError: "initial" });
			return false;
		} else if (!userDTO.email.includes("@")) {
			this.setState({ emailNotValid: "initial" });
			return false;
		} else if (userDTO.firstname === "") {
			this.setState({ nameError: "initial" });
			return false;
		} else if (userDTO.surname === "") {
			this.setState({ surnameError: "initial" });
			return false;
		} else if (this.addressInput.current.value === "") {
			this.setState({ addressError: "initial" });
			return false;
		} else if (userDTO.phonenumber === "") {
			this.setState({ phoneError: "initial" });
			return false;
		} else if (userDTO.password === "") {
			this.setState({ passwordError: "initial" });
			return false;
		} else if (this.state.repeatPassword === "") {
			this.setState({ repeatPasswordError: "initial" });
			return false;
		}else if (userDTO.password !== this.state.repeatPassword) {
			this.setState({ repeatPasswordSameError: "initial" });
			return false;
		}
		return true;
	};

	handleModalClose = () => {
		this.setState({ openModal: false, redirect: true });
	};

	
	handleSignUp = () => {
		console.log(this.addressInput.current)
		if (this.addressInput.current === null) {
			this.setState({ addressError: "initial" });
			return false;
		}
		else{
			alert(this.state.email)
		let street;
		let city;
		let country;
		let latitude;
		let longitude;
		let found = true;
		this.ymaps
			.geocode(this.addressInput.current.value, {
				results: 1,
			})
			.then(function (res) {

				if (typeof res.geoObjects.get(0) === "undefined") found = false;
				else {
					var firstGeoObject = res.geoObjects.get(0),
						coords = firstGeoObject.geometry.getCoordinates();
					latitude = coords[0];
					longitude = coords[1];
					country = firstGeoObject.getCountry();
					street = firstGeoObject.getThoroughfare();
					city = firstGeoObject.getLocalities().join(", ");
				}
			})
			.then((res) => {

				let userDTO = {
					email: this.state.email,
					firstname: this.state.name,
					surname: this.state.surname,
					address: { street, country, city, latitude, longitude },
					phonenumber: this.state.phoneNumber,
					password: this.state.password,
				};
			
				if (this.validateForm(userDTO)) {
					if (found === false) {
						this.setState({ addressNotFoundError: "initial" });
					} else {
						
						Axios.post(BASE_URL + "/api/auth/signup", userDTO, { validateStatus: () => true })
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
									this.setState({ openModal: true });
								}
								
							})
							.catch((err) => {
								console.log(err);
							
							});
						}
					}
				});
			}
		};
	

	handleCloseAlert = () => {
		this.setState({ hiddenErrorAlert: true });
	};

	render() {
		return(
			
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
									<View className="text-danger" style={{ display: this.state.emailError }}>
										<Text>Email address must be entered.</Text>
									</View>
									<View className="text-danger" style={{ display: this.state.emailNotValid }}>
                  <Text>Email address is not valid.</Text>
									</View>
								</View>
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										<Text>Name:</Text>
										<TextInput
											placeholder="Name"
											class="form-control"
											type="text"
											id="name"
											onChange={this.handleNameChange}
											value={this.state.name}
										/>
									</View>
									<View className="text-danger" style={{ display: this.state.nameError }}>
                  <Text>Name must be entered.</Text>
									</View>
								</View>
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										<Text>Surname:</Text>
										<TextInput
											placeholder="Surname"
											class="form-control"
											type="text"
											id="surname"
											onChange={this.handleSurnameChange}
											value={this.state.surname}
										/>
									</View>
									<View className="text-danger" style={{ display: this.state.surnameError }}>
                  <Text>Surname must be entered.</Text>
									</View>
								</View>
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										<Text>Address:</Text>
										<TextInput className="form-control" id="suggest" ref={this.addressTextInput} placeholder="Address" />
									</View>
									<YMaps
										query={{
											load: "package.full",
											apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
											lang: "en_RU",
										}}
									>
										<Map
											style={{ display: "none" }}
											state={mapState}
											onLoad={this.onYmapsLoad}
											instanceRef={(map) => (this.map = map)}
											modules={["coordSystem.geo", "geocode", "util.bounds"]}
										></Map>
									</YMaps>
									<View className="text-danger" style={{ display: this.state.addressError }}>
                  <Text>Address must be entered.</Text>
									</View>
									<View className="text-danger" style={{ display: this.state.addressNotFoundError }}>
                  <Text>Sorry. Address not found. Try different one.</Text>
									</View>
								</View>
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
									<View className="text-danger" style={{ display: this.state.phoneError }}>
                  <Text>Phone number must be entered.</Text>
									</View>
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
									<View className="text-danger" style={{ display: this.state.passwordError }}>
                  <Text>Password must be entered.</Text>
									</View>
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
									<View className="text-danger" style={{ display: this.state.repeatPasswordError }}>
                  <Text>Repeat password must be entered.</Text>
									</View>
									<View className="text-danger" style={{ display: this.state.repeatPasswordSameError }}>
                  <Text>Passwords are not the same.</Text>
									</View>
								</View>

								<View className="form-group">
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
                    title = "Sign Up"
									>
										
									</Button>
								</View>
						
						</View>
					</View>
          <ModalDialog
					show={this.state.openModal}
					onCloseModal={this.handleModalClose}
					header="Successful registration"
					text="You have successfully registrated."
				/>
				</View>
  
		
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});
