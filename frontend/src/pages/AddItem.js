import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { BASE_URL } from "../constants.js";
import Axios from "axios";
import ModalDialog from "../components/ModalDialog";
import { Redirect } from "react-router-dom";
import HeadingAlert from "../components/HeadingAlert";
import ImageUploader from 'react-images-upload';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            types: ["Hoodie", "T-Shirt", "Hat"],
            colors: ["Blue", "Green", "Yellow"],
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
        };
        this.onDrop = this.onDrop.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            //pictures: picture
        });
        
    }

    test(pic){
       
       alert('skjfksd')
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


  
 

    toggleCertificatePurposeVisibility = () => {
        this.setState({ showedPurposes: !this.state.showedPurposes });
    };

    handleQuantityChange = (event, obj) => {
        let u = this.state.quantity;
        let l = false;
        this.setState({ q: obj + "," + event.target.value });

        if (u.length === 0) {
            let b = obj + "," + event.target.value;
            u.push(b)
        }
        else {
            u.forEach((item) => {
                let a = item.split(",")

                if (a[0] === obj) {
                    l = true;
                }
            });

            if (l === false) {

                let b = obj + "," + event.target.value;
                u.push(b)

            }

            else {

                u.forEach((item) => {
                    let a = item.split(",")

                    if (a[0] === obj) {
                        u.pop(item)
                        let b = obj + "," + event.target.value;
                        u.push(b)
                        this.setState({ quantity: u });
                        return;
                    }
                });

            }


        }
        this.setState({ quantity: u });

    };


    handleSizeChange = (event, obj, o) => {
        let u = this.state.size;
        let l = false;


        if (u.length === 0) {
            let b = obj + "," + o + "," + event.target.value;
            u.push(b)
        }
        else {
            u.forEach((item) => {
                let a = item.split(",")

                if (a[0] === obj && a[1] === o) {
                    l = true;
                }
            });

            if (l === false) {

                let b = obj + "," + o + "," + event.target.value;
                u.push(b)

            }

            else {

                u.forEach((item) => {
                    let a = item.split(",")

                    if (a[0] === obj && a[1] === o) {
                        u.pop(item)
                        let b = obj + "," + o + "," + event.target.value;
                        u.push(b)
                        this.setState({ size: u });
                        return;
                    }
                });

            }


        }
        this.setState({ size: u });

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
        let itemDTO = "";
        let pics = []

        this.state.pictures.forEach((p)=>{
            console.log(p.name)
            pics.push(p.name)

        });
        if (this.state.hat) {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                colors: this.state.quantity,
                sizes: this.state.size,
                gender: "Hat"
            }
        } else {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                colors: this.state.quantity,
                sizes: this.state.size,
                gender: this.state.gender
            };
        }
        console.log(itemDTO);

        if (this.validateForm(itemDTO)) {

            console.log(this.state.pictures)
            /*this.state.pictures.forEach((pic) => {
                this.test(pic);
            });
    
            this.setState({
                pictures: []
                
            });*/

            console.log(itemDTO);
            Axios.post(BASE_URL + "/api/items/add", itemDTO, this.state.pictures, { validateStatus: () => true })
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
                                            <div className="control-group">
                                                <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

                                                    <input
                                                        placeholder="Insert color quantity"
                                                        class="form-control"
                                                        type="text"
                                                        id={obj}
                                                        onChange={(e) => this.handleQuantityChange(e, obj)}

                                                    />
                                                </div>

                                            </div>
                                            <div className={this.state.showedPurposes ? "" : "collapse"}>
                                                {this.state.sizes.map((o) => (
                                                    <div key={o} className="ml-3">
                                                        <input onChange={(e) => this.handleChange(e, o)} id={o} type="checkbox" />

                                                        <label className="ml-2" htmlFor={o} style={{ cursor: "pointer" }}>
                                                            {o}
                                                        </label>
                                                        <div className="control-group">
                                                            <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

                                                                <input
                                                                    placeholder="Insert size quantity"
                                                                    class="form-control"
                                                                    type="text"
                                                                    id={obj}
                                                                    onChange={(e) => this.handleSizeChange(e, obj, o)}

                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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

