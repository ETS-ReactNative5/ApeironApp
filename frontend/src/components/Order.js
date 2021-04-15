import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getAuthHeader from "../GetHeader";
import Axios from "axios";
import { BASE_URL } from "../constants.js";

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
							onChange={(e) => this.props.handleColorChange(e)}
							value={this.props.selectedColor}
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
							{this.props.showedCSize.map((chain) => (
								<option key={chain.size} value={chain.size}>
									{chain.size}
								</option>
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

					<div style={{ marginTop: "2rem", marginLeft: "10rem" }}>
						<Button className="mt-3" onClick={this.handleEndEntityChange}>
							{this.props.buttonName}
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default EndEntityCreateModal;
