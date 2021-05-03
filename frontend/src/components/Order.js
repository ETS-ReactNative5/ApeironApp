import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getAuthHeader from "../GetHeader";
import Axios from "axios";
import { BASE_URL } from "../constants.js";
var Carousel = require('react-responsive-carousel').Carousel;


class EndEntityCreateModal extends Component {
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
	

	};
	componentDidMount() {
	}


	handleQuantityChange = (event) => {
		this.setState({ quantity: event.target.value });
	};
	handleDateChange = (date) => {
		this.setState({ selectedDate: date });
		
	};
	componentWillMount = () => {
		this.selectedCheckboxes = new Set();
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

	toggleKeyUsageVisibility = () => {
		this.setState({ showedKeyUsages: !this.state.showedKeyUsages });
	};

	toggleCertificateExtensionVisibility = () => {
		this.setState({ showedExtensions: !this.state.showedExtensions });
	};

	toggleCertificatePurposeVisibility = () => {
		this.setState({ showedPurposes: !this.state.showedPurposes });
	};

	handleAddChange = () => {
		let u = this.state.orders;
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

	handleReserveChange = () => {
		let newOrderDTO = {
			items: this.state.orders,
			dueDate: this.state.selectedDate

		};


		Axios.post(BASE_URL + "/api/reservations/add", newOrderDTO, { validateStatus: () => true })
			.then((res) => {
				if (res.status === 409) {
					this.setState({
						errorHeader: "Resource conflict!",
						errorMessage: "Email already exist.",
						hiddenErrorAlert: false,
					});
				} else if (res.status === 500) {
					this.setState({ errorHeader: "Internal server error!", errorMessage: "Server error.", hiddenErrorAlert: false });
				} else {
					console.log("Success");
					this.setState({ openModal: true });
				}
			})
			.catch((err) => {
				console.log(err);
			});

	}

	handleRemoveChange = (e, c) => {

		let u = this.state.orders;
		u.pop(c);
		this.setState({ orders: u })
	}

	render() {
		return (
			<Modal
				show={this.props.show}
				dialogClassName="modal-80w-150h"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				onHide={this.props.onCloseModal}
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">{this.props.header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<select
							class="btn btn-secondary dropdown-toggle"
							aria-haspopup="true"
							aria-expanded="false"
							style={{ marginTop: "0.5rem", width: "29em" }}
							value={this.props.selectedColor}
							onChange={(e) => this.props.handleColorChange(e)}
						>
							<option style={{ marginLeft: "12rem" }} value="">
								Choose the color{" "}
							</option>
							{this.props.showedColors.map((chain) => (

								<option key={chain.color} value={chain.color}>
									{chain.color}
								</option>
							))}
						</select>
					</div>
					<div>
						<select
							class="btn btn-secondary dropdown-toggle"
							aria-haspopup="true"
							aria-expanded="false"
							style={{ marginTop: "0.5rem", width: "29em" }}
							onChange={(e) => this.props.handleSizeChange(e)}
							value={this.props.selectedSize}

						>
							<option style={{ marginLeft: "12rem" }} value="">
								Choose the size{" "}
							</option>
							{this.props.showedSizes.map((c) => (
								<>
									{c.map((a) => (
										<option key={a.size} value={a.size}>
											{a.size}
										</option>
									))}</>
							))}
						</select>
					</div>

					<div className="control-group">
						<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<label>Insert quantity of items:</label>
							<input
								placeholder="Quantity"
								class="form-control"
								type="text"
								id="name"
								onChange={this.handleQuantityChange}
								value={this.state.quantity}
							/>
						</div>

					</div>


					<div className="form-col  mr-3">
						<div style={{ marginTop: "2rem" }}></div>
						<h6>{"Choose due date"}</h6>

						<DatePicker
							className="form-control"
							minDate={new Date()}
							onChange={(date) => this.handleDateChange(date)}
							selected={this.state.selectedDate}
						/>
					</div>

					<div>
						<Button className="mt-3" onClick={this.handleAddChange}>
							Add to chart
						</Button>
					</div>

					<div style={{ marginTop: "2rem" }}>
						<table class="table table-striped">
							<tr><th>Color</th><th>Size</th><th>Quantity</th><th>Due date</th><th>Remove</th></tr>
							{this.state.orders.map((c) => (
								<tr><td>{c.color}</td><td>{c.size}</td><td>{c.quantity}</td><td>{new Date(c.date).toLocaleDateString()}</td>
									<td><Button className="mt-3" onClick={(e) => this.handleRemoveChange(e, c)}>
										Remove
						</Button></td></tr>
							))}
						</table>

					</div>

					<div style={{ marginTop: "2rem", marginLeft: "10rem" }}>
						<Button className="mt-3" onClick={this.handleReserveChange}>
							{this.props.buttonName}
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default EndEntityCreateModal;
