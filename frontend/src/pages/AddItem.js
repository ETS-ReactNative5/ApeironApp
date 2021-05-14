import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { BASE_URL } from "../constants.js";
import Axios from "axios";
import ModalDialog from "../components/ModalDialog";
import { Redirect } from "react-router-dom";
import HeadingAlert from "../components/HeadingAlert";
import ImageUploader from 'react-images-upload';
import getAuthHeader from "../GetHeader";
import { Button, Modal } from "react-bootstrap";


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            types: ["Hoodie", "T-Shirt", "Hat"],
            colors: [],
            sizes: ["XS", "S", "M", "L", "XL"],
            showedTypes: ["Hoodie", "T-Shirt", "Hat"],
            errorHeader: "",
            errorMessage: "",
            hiddenErrorAlert: true,
            name: "",
            price: "",
            nameError: "none",
            typeError: "none",
            priceError: "none",
            selectedType: "",
            openModal: false,
            quantity: [],
            size: [],
            q: "",
            s: "",
            gender: "",
            hat: false,
            selectedColor: "",
            selectedSize: "",
            quantity: [],
            orders: [],


        };
        this.onDrop = this.onDrop.bind(this);

    }

    hasRole = (reqRole) => {
        let roles = JSON.parse(localStorage.getItem("keyRole"));
      
        if (roles === null) return false;

        if (reqRole === "*") return true;

        for (let role of roles) {
            if (role === reqRole) return true;
        }
        return false;
    };

    componentDidMount() {
        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/admin/colors", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    if (res.status !== 401) {
                        console.log(res.data)
                        this.setState({
                            colors: res.data,
                        });

                    } else {
                        this.setState({ redirect: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            //pictures: picture
        });

    }

    test(pic) {

        this.setState({
            fileUploadOngoing: true
        });

        const fileInput = document.querySelector("#fileInput");
        const formData = new FormData();

        formData.append("file", pic);
        formData.append("test", "StringValueTest");

        const options = {
            method: "POST",
            body: formData

        };
        fetch(BASE_URL + "/api/items/upload", options);
    }

    handleRemoveChange = (e, c) => {

		let u = this.state.orders;
		u.pop(c);
		this.setState({ orders: u })
	}
    
    handleAddChange = () => {
		let u = this.state.orders;
		let reservation = {
			color: this.state.selectedColor,
			size: this.state.selectedSize,
			quantity: this.state.quantity,
		};

		u.push(reservation);
		this.setState({ orders: u });

		let t = [];
		this.state.orders.forEach((a) => {
			let reservation = {
				color: a.color,
				size: a.size,
				quantity: a.quantity,
			};
			t.push(reservation)
		});
		this.state.orders = [];
		this.setState({ orders: t });


	}



    handleQuantityChange = (event) => {
		this.setState({ quantity: event.target.value });
	};
    handleColorChange = (e) => {

		let u = [];
		this.setState({ selectedColor: e.target.value }, () => {
			console.log(this.state);
		});
		
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
		this.setState({ selectedSize: e.target.value }, () => {
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


    toggleCertificatePurposeVisibility = () => {
        this.setState({ showedPurposes: !this.state.showedPurposes });
    };


    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
    };


    validateForm = (itemDTO) => {
        this.setState({
            nameError: "none",
            priceError: "none",
            typeError: "none"
        });

        if (itemDTO.name === "") {
            this.setState({ nameError: "initial" });
            return false;
        } else if (itemDTO.price === "") {
            this.setState({ priceError: "initial" });
            return false;
        } else if (itemDTO.type === "") {
            this.setState({ typeError: "initial" });
            return false;
        }
        return true;
    };

    handleTypeChange = (e) => {
        if (e.target.value === "") {
            this.setState({ selectedType: "", showedTypes: this.state.types });
        } else {
            if (e.target.value === "Hat") {
                this.setState({ hat: true });
            } else {
                this.setState({ hat: false });
            }
            this.state.types.forEach((chain) => {
                if (chain === e.target.value) {
                    console.log(chain);
                    this.changeTypeUsers(chain);
                    this.setState({ selectedType: chain }, () => {
                        console.log(this.state);
                    });
                }
            });
        }
    };

    changeTypeUsers = (e) => {
        let u = [];

        this.state.types.forEach((user) => {
            if (user !== e) {
                u.push(user);
            }
        });

        this.setState({ type: u });
    };
    handleSignUp = () => {

        console.log("sdfgsssss" + this.state.orders);

        let itemDTO = "";
        let pics = []
      

        this.state.pictures.forEach((p) => {
            console.log(p.name)
            pics.push(p.name)

        });
        if (this.state.hat) {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                quantityDTO:  this.state.orders,
                gender: "Hat",
                pictures: pics
            }
        } else {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                quantityDTO: this.state.orders,
                gender: this.state.gender,
                pictures: pics
            };
        }
        console.log(itemDTO);

        if (this.validateForm(itemDTO)) {

            console.log(this.state.pictures)
            this.state.pictures.forEach((pic) => {
                this.test(pic);
            });

            this.setState({
                pictures: []

            });

            console.log(itemDTO);
            if (!this.hasRole("ROLE_ADMIN")) {
                this.setState({ redirect: true });
            } else {
            Axios.post(BASE_URL + "/api/items/add", itemDTO, this.state.pictures, { validateStatus: () => true} )
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
    }



    };

    handleCloseAlert = () => {
        this.setState({ hiddenErrorAlert: true });
    };
    handleModalClose = () => {
        this.setState({ openModal: false, redirect: false });
    };

    handleGenderChange(event) {

        this.setState({ gender: event.target.value });
    }

    render() {
        if (this.state.redirect) return <Redirect push to="/" />;

        return (
            <React.Fragment>
                <TopBar />
                <Header />

                <div className="container" style={{ marginTop: "8%" }}>
                    <HeadingAlert
                        hidden={this.state.hiddenErrorAlert}
                        header={this.state.errorHeader}
                        message={this.state.errorMessage}
                        handleCloseAlert={this.handleCloseAlert}
                    />
                    <h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: "2rem" }}>
                        Add new item
					</h5>

                    <div className="row section-design">
                        <div className="col-lg-8 mx-auto">
                            <br />
                            <form id="contactForm" name="sentMessage" novalidate="novalidate">
                                <div className="control-group">
                                    <div><ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        withPreview={true}
                                    />
                                    </div>
                                    <div>
                                        <select
                                            class="btn btn-secondary dropdown-toggle"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{ marginTop: "0.5rem", width: "29em" }}
                                            onChange={(e) => this.handleTypeChange(e)}
                                            value={this.state.selectedType}
                                        >
                                            <option style={{ marginLeft: "12rem" }} value="">
                                                Choose an item type{" "}
                                            </option>
                                            {this.state.showedTypes.map((chain) => (
                                                <option key={chain} value={chain}>
                                                    {chain}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                </div>
                                <div className="control-group">
                                    <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                        <label>Insert item name:</label>
                                        <input
                                            placeholder="Name"
                                            class="form-control"
                                            type="text"
                                            id="name"
                                            onChange={this.handleNameChange}
                                            value={this.state.name}
                                        />
                                    </div>
                                    <div className="text-danger" style={{ display: this.state.nameError }}>
                                        Item name must be entered.
									</div>
                                </div>
                                <div className={this.state.hat ? 'collapse' : ''}>
                                    <p><input type="radio" value="Male" name="gender" onChange={(e) => this.handleGenderChange(e)} /> Male</p>
                                    <p><input type="radio" value="Female" name="gender" onChange={(e) => this.handleGenderChange(e)} /> Female</p>
                                    <p><input type="radio" value="Other" name="gender" onChange={(e) => this.handleGenderChange(e)} /> Other </p>
                                </div>
                                <div className="control-group">
                                    <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                        <label>Insert item price:</label>
                                        <input
                                            placeholder="Price"
                                            class="form-control"
                                            type="text"
                                            id="surname"
                                            onChange={this.handlePriceChange}
                                            value={this.state.price}
                                        />
                                    </div>
                                    <div className="text-danger" style={{ display: this.state.priceError }}>
                                        Price must be entered.
									</div>
                                </div>

                                <div>
                                    <select
                                        class="btn btn-secondary dropdown-toggle"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        style={{ marginTop: "0.5rem", width: "29em" }}
                                        value={this.state.selectedColor}
                                        onChange={(e) => this.handleColorChange(e)}
                                    >
                                        <option style={{ marginLeft: "12rem" }} value="">
                                            Choose the color{" "}
                                        </option>
                                        {this.state.colors.map((chain) => (

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
                                        onChange={(e) => this.handleSizeChange(e)}
                                        value={this.state.selectedSize}

                                    >
                                        <option style={{ marginLeft: "12rem" }} value="">
                                            Choose the size{" "}
                                        </option>
                                        {this.state.sizes.map((a) => (
                                           
                                                    <option key={a} value={a}>
                                                        {a}
                                                    </option>
                                               
                                        ))}
                                    </select>
                                </div>

                                <div className="control-group">
                                    <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                        <label>Insert quantity of item:</label>
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

                                
                                <div>
                                    <Button className="mt-3" onClick={this.handleAddChange}>
                                        Add to chart
						            </Button>
                                </div>

                                <div style={{ marginTop: "2rem" }}>
                                    <table class="table table-striped">
                                        <tr><th>Color</th><th>Size</th><th>Quantity</th><th>Remove</th></tr>
                                        {this.state.orders.map((c) => (
                                            <tr><td>{c.color}</td><td>{c.size}</td><td>{c.quantity}</td>
                                                <td><Button className="mt-3" onClick={(e) => this.handleRemoveChange(e, c)}>
                                                    Remove
						</Button></td></tr>
                                        ))}
                                    </table>

                                </div>



                                <div className="form-group">
                                    <button
                                        style={{
                                            background: "#1977cc",
                                            marginTop: "15px",
                                            marginLeft: "40%",
                                            width: "20%",
                                        }}
                                        onClick={this.handleSignUp}
                                        className="btn btn-primary btn-xl"
                                        id="sendMessageButton"
                                        type="button"
                                    >
                                        Add item
									</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ModalDialog
                    show={this.state.openModal}
                    onCloseModal={this.handleModalClose}
                    header="Success"
                    text="You have successfully added new item."
                />

                <ModalDialog
                    show={this.state.openModal}
                    onCloseModal={this.handleModalClose}
                    header="Success"
                    text="You have successfully added new item."
                />

            </React.Fragment>


        );
    }
}
export default RegisterPage;

