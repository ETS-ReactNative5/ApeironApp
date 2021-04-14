import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { BASE_URL } from "../constants.js";
import Axios from "axios";
import ModalDialog from "../components/ModalDialog";
import { Redirect } from "react-router-dom";
import HeadingAlert from "../components/HeadingAlert";


class RegisterPage extends Component {
    state = {
        types: ["Hoodie", "T-Shirt", "Hat"],
        colors: ["Blue", "Green", "Yellow"],
        errorHeader: "",
        errorMessage: "",
        hiddenErrorAlert: true,
        name: "",
        price: "",
        nameError: "none",
        priceError: "none",
        
		openModal: false,
    };



    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
    };

  
    toggleCertificatePurposeVisibility = () => {
		this.setState({ showedPurposes: !this.state.showedPurposes });
	};
    validateForm = (itemDTO) => {
        this.setState({
            nameError: "none",
            priceError: "none",
           
        });

       if (itemDTO.name === "") {
            this.setState({ nameError: "initial" });
            return false;
        } else if (itemDTO.price === "") {
            this.setState({ priceError: "initial" });
            return false;
        }
        return true;
    };

    

    handleSignUp = () => {
      
           
                let itemDTO = {
                    type: this.state.type,
                };
                console.log(itemDTO);

                if (this.validateForm(itemDTO)) {
                  
                        console.log(itemDTO);
                        Axios.post(BASE_URL + "/api/auth/signup", itemDTO, { validateStatus: () => true })
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
                    
                
           
    };

    handleCloseAlert = () => {
        this.setState({ hiddenErrorAlert: true });
    };
    handleModalClose = () => {
		this.setState({ openModal: false, redirect: true });
	};

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
                                    <div>
                                        <select
                                            class="btn btn-secondary dropdown-toggle"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{ marginTop: "0.5rem", width: "29em" }}
                                            onChange={(e) => this.props.handleEndEntityIssuerChange(e)}
                                            value={this.props.selectedIssuer}
                                        >
                                            <option style={{ marginLeft: "12rem" }} value="">
                                                Choose an item type{" "}
                                            </option>
                                            {this.state.types.map((chain) => (
                                                <option key={chain} value={chain}>
                                                    {chain}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="text-danger" style={{ display: this.state.typeError }}>
                                        Item type must be choosen.
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

                                <table className="table table-hover mt-2" style={{ cursor: "pointer" }} onClick={this.toggleCertificatePurposeVisibility}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 className="col-10">Choose item's available colors</h5>
                                            </td>
                                            <td>
                                                <a>
                                                    <i className="icofont-caret-down align-middle"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className={this.state.showedPurposes ? "" : "collapse"}>
                                    {this.state.colors.map((obj) => (
                                        <div key={obj} className="ml-3">
                                            <input onChange={(e) => this.handleChange(e, obj)} id={obj} type="checkbox" />

                                            <label className="ml-2" htmlFor={obj} style={{ cursor: "pointer" }}>
                                                {obj}
                                            </label>
                                        </div>
                                    ))}
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
            </React.Fragment>
        );
    }
}

export default RegisterPage;
