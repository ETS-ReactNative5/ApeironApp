import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import getAuthHeader from "../../GetHeader";
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import Carousel from 'react-native-snap-carousel';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Button as Button1 } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	TextInput,
	Button,
	FlatList,
	Image,
	ViewComponent,
	ScrollView
} from 'react-native';
import ModalDialog from "../components/ModalDialog";
import { DataTable } from 'react-native-paper';
class Order extends Component {
	constructor() {
		super();
	}
	state = {
		selectedDate: "",
		selectedPurposes: [],
		selectedExtensions: [],
		selectedKeyUsages: [],
		showedPurposes: false,
		showedExtensions: false,
		showedKeyUsages: false,
		selectedColor: "",
		selectedDate: new Date(),
		quantity: "",
		chain: "",
		list: [],
		selectedItem: "",
		orders: [],
		orderError: false,
		quantityError: false,
		dueDateError: false,
		hiddenSuccessAlert: true,
		successHeader: "",
		successMessage: "",
		openModal: false,


	};

	handleModalClose = () => {
		this.setState({ openModal: false, redirect: true });
	};


	handleQuantityChange = (event) => {
		this.setState({ quantity: event.nativeEvent.text });
	};
	handleDateChange = (date) => {
		console.log(date)
		this.setState({ selectedDate: date });

	};

	handleEndEntityChange = () => {
		let certificateDTO = {
			SubjectId: "",
			DateTo: this.state.selectedDate,
			KeyUsageIds: this.state.selectedKeyUsages,
			ExtendedKeyUsage: this.state.selectedPurposes,
			ExtensionIds: this.state.selectedExtensions,
			SignerSerialNumber: "",
		};

		this.setState({
			selectedDate: "",
			selectedPurposes: [],
			selectedExtensions: [],
			selectedKeyUsages: [],
			showedPurposes: false,
			showedExtensions: false,
			showedKeyUsages: false,
		});

		this.props.handleOrderChange(certificateDTO);
	};

	handleChange(e, key) {
		let copy = [];
		if (this.state.selectedPurposes.includes(key)) {
			this.state.selectedPurposes.forEach((purpose) => {
				if (purpose !== key) {
					copy.push(purpose);
				}
			});
		} else {
			copy = [...this.state.selectedPurposes];
			copy.push(key);
		}
		this.setState({ selectedPurposes: copy });
	}

	handleChangeExtensions(e, key) {
		let copy = [];
		if (this.state.selectedExtensions.includes(key)) {
			this.state.selectedExtensions.forEach((extension) => {
				if (extension !== key) {
					copy.push(extension);
				}
			});
		} else {
			copy = [...this.state.selectedExtensions];
			copy.push(key);
		}
		this.setState({ selectedExtensions: copy });
	}

	handleChangeKeyUsages = (key) => {
		let copy = [];
		if (this.state.selectedKeyUsages.includes(key)) {
			this.state.selectedKeyUsages.forEach((keyUsage) => {
				if (keyUsage !== key) {
					copy.push(keyUsage);
				}
			});
		} else {
			copy = [...this.state.selectedKeyUsages];
			copy.push(key);
		}
		this.setState({ selectedKeyUsages: copy });
	};



	handleAddChange = () => {
		let u = this.state.orders;


		this.props.showedColors.forEach((item) => {
			if (this.props.selectedColor === item.color) {
				item.sizes.forEach((size) => {

					if (this.props.selectedSize === size.size) {
						if (size.quantity >= this.state.quantity) {
							let reservation = {
								color: this.props.selectedColor,
								size: this.props.selectedSize,
								date: this.state.selectedDate,
								quantity: this.state.quantity,
								itemId: this.props.shirt.id,
							};

							u.push(reservation);
							this.setState({ orders: u });

							let t = [];
							this.state.orders.forEach((a) => {
								let reservation = {
									color: a.color,
									size: a.size,
									date: this.state.selectedDate,
									quantity: a.quantity,
									itemId: a.itemId,
								};
								t.push(reservation)
							});
							this.state.orders = [];
							this.setState({ orders: t });


						}
						else {
							this.setState({ quantityError: true });
							return false;



						}
					}

				})
			}
		}
		)




	}

	handleReserveChange = () => {
		let newOrderDTO = {
			items: this.state.orders,
			dueDate: this.state.selectedDate

		};
		this.setState({
			hiddenSuccessAlert: true,
			successHeader: "",
			successMessage: "",
			hiddenFailAlert: true,
			failHeader: "",
			failMessage: "",
		});
		if (this.validateForm(newOrderDTO)) {

			Axios.post(BASE_URL + "/api/reservations/add", newOrderDTO, { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
				.then((res) => {
					if (res.status === 500) {
						this.setState({ errorHeader: "Internal server error!", errorMessage: "Server error.", hiddenErrorAlert: false });
					} else {
						alert("You have successfuly placed an order.")

					}
				})
				.catch((err) => {
					console.log(err);
				});

		}

	}

	handleRemoveChange = (e, c) => {

		let u = this.state.orders;
		u.pop(c);
		this.setState({ orders: u })
	}


	validateForm = (newOrderDTO) => {
		this.setState({
			orderError: false,
			dueDateError: false,

		});


		if (newOrderDTO.items === "") {
			this.setState({ orderError: true });
			return false;
		} else if (newOrderDTO.dueDate === "") {
			this.setState({ dueDateError: true });
			return false;
		}

		return true;
	};

	_renderItem({ item, index }) {

		return <View key={item}>
			<Image style={styles.image} key={item}
				source={{ uri: item }}
			/>

		</View>


	}


	render() {
		const { isVisible, handleModalClose, buttonName, header, onCloseModal, handleColorChange, handleSizeChange, shirt, showedColors, selectedColor, showedSizes, selectedSize } = this.props;
		return (
			isVisible &&

			<Modal isVisible={true} transparent={false} 	>
				<ScrollView >

					<View style={{ backgroundColor: "white" }}>
						<Button1 onPress={(e)=>this.props.handleModalClose(e)} style={{ marginLeft: 230, marginTop: 15 }}> <Icon name="close" color="black" size={20} /></Button1>
						<Carousel sliderWidth={800} itemWidth={800} renderItem={this._renderItem} data={shirt.files}>


						</Carousel>

						<Picker
							class="btn btn-secondary dropdown-toggle"
							aria-haspopup="true"
							aria-expanded="false"
							selectedValue={this.props.selectedColor}
							onValueChange={(e) => this.props.handleColorChange(e)}
						>
							<Picker.Item key={"1"} value="Choose the color" label="Choose the color">

							</Picker.Item>
							{showedColors.map((chain) => (

								<Picker.Item key={chain.color} value={chain.color} label={chain.color} >

								</Picker.Item>
							))}
						</Picker>

						<Picker
							class="btn btn-secondary dropdown-toggle"
							aria-haspopup="true"
							aria-expanded="false"
							selectedValue={this.props.selectedSize}
							onValueChange={(e) => this.props.handleSizeChange(e)}


						>
							<Picker.Item key={"2"} value="Choose the size" label="Choose the size">

							</Picker.Item>
							{showedSizes.map((a) => (
								<Picker.Item key={a.size} value={a.size} label={a.size}>

								</Picker.Item>

							))}
						</Picker>



						<View style={styles.loginText}>
							<Text style={styles.text}>Insert quantity of items:</Text>
							<TextInput
								placeholder="Quantity"
								className="form-control"
								id="name"
								type="text"
								onChange={this.handleQuantityChange}
								value={this.state.quantity}
							/>
						</View>




						<View style={styles.loginText}>
							<Text style={styles.text}>Choose due date</Text>

							<DatePicker
								className="form-control"
								date={this.state.selectedDate}
								minDate={new Date()}
								onDateChange={(date) => { this.setState({ selectedDate: date }) }}
							/>
						</View>

						<View style={styles.loginText}>
							<Button className="mt-3" onPress={this.handleAddChange} title="Add to chart">

							</Button>
						</View>

						<View style={styles.loginText}>
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Color</DataTable.Title>
									<DataTable.Title >Size</DataTable.Title>
									<DataTable.Title >Quantity</DataTable.Title>
									<DataTable.Title >Due date</DataTable.Title>
									<DataTable.Title >Remove</DataTable.Title>
								</DataTable.Header>


								{this.state.orders.map((c) => (

									<DataTable.Row>
										<DataTable.Cell>{c.color}</DataTable.Cell>
										<DataTable.Cell >{c.size}</DataTable.Cell>
										<DataTable.Cell >{c.quantity}</DataTable.Cell>
										<DataTable.Cell >{new Date(c.date).toLocaleDateString()}</DataTable.Cell>
										<DataTable.Cell ><Button className="mt-3" onPress={(e) => this.handleRemoveChange(e, c)} title="Remove">

										</Button></DataTable.Cell>
									</DataTable.Row>



								))}
							</DataTable>

						</View>
						{ this.state.orderError && <View style={styles.loginText} >
							<Text>Orders must be filled correctly</Text>
						</View>}

						{ this.state.quantityError && <View style={styles.loginText}>
							<Text>You must insert quantity that is available.</Text>
						</View>}

						{ this.state.dueDateError && <View style={styles.loginText} >
							<Text>Date must be selected</Text>
						</View>}


						<View style={styles.loginText}>
							<Button className="mt-3" onPress={this.handleReserveChange} title={buttonName}>

							</Button>
						</View>

						<View style={{ marginTop: 30 }}></View>

						<ModalDialog
							show={this.state.openModal}
							onCloseModal={this.handleModalClose}
							header="Success"
							text="You have successfully sent an order."
						/>
					</View>
				</ScrollView>
			</Modal>

		);
	}
}

export default Order;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	loginText: {
		padding: 3,
		marginLeft: 15,

		marginTop: 15,
		marginRight: 15
	},
	image: {
		marginLeft: 20,
		marginTop: 30,
		width: 300,
		height: 200,
	},
	loginBtn: {

		borderRadius: 25,

	},
	text: {

		fontSize: 16,

	},

});

