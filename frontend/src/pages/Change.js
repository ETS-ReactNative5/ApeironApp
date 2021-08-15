import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import Axios from "axios";
import { BASE_URL } from "../constants.js";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import HeadingAlert from "../components/HeadingAlert";
import getAuthHeader from "../GetHeader";


class Change extends Component {
    state = {
        colors: [],
        newColor: "",
    };



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

    handleColorChange = (event) => {
        this.setState({ newColor: event.target.value });
    };


    handleDeleteChange = (e, o) => {
        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/admin/deleteColor/"+ o.id, { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    if (res.status !== 401) {
                        console.log(res.data)
                        window.location.reload();
                    } else {
                        this.setState({ redirect: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };
    handleAdd = () => {
        let colorDTO = {
            color: this.state.newColor,
        }
        console.log(this.state.newColor);

        Axios.post(BASE_URL + "/api/admin/newColor",colorDTO, {
            validateStatus: () => true,
            headers: { Authorization: getAuthHeader() },
        })
            .then((res) => {
                window.location.reload();
                if (res.status === 400) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Bad request", failMessage: "Invalid argument." });
                } else if (res.status === 500) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Internal server error", failMessage: "Server error." });
                } else if (res.status === 204) {
                    console.log("Success");
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });



    };

    render() {
        if (this.state.redirect) return <Redirect push to="/unauthorized" />;
        return (
            <React.Fragment>
                <TopBar />
                <Header />

                <div className="container" style={{ marginTop: "10%" }}>

                    <h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: "10rem" }}>
                        Add new color
					</h5>

                    <div>
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.colors.map((o) => (
                                <div><tr>
                                <td>{o.color}</td>
                                <td   ><Button onClick={(e) => this.handleDeleteChange(e, o)}>DELETE</Button></td>
                              </tr></div>

                            ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="row section-design">
                        <div className="col-lg-8 mx-auto">
                            <br />
                            <form id="contactForm" name="sentMessage" novalidate="novalidate">
                                <div className="control-group">
                                    <div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                        <input
                                            placeholder="Insert new color"
                                            className="form-control"
                                            id="name"
                                            type="text"
                                            onChange={this.handleColorChange}
                                            value={this.state.newColor}
                                        />
                                    </div>

                                </div>

                                <div className="form-group">
                                    <Button
                                        style={{ background: "#1977cc", marginTop: "15px", marginLeft: "40%", width: "20%" }}
                                        onClick={this.handleAdd}
                                        className="btn btn-primary btn-xl"
                                        id="sendMessageButton"
                                        type="button"
                                    >
                                        Add color
									</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }


}

export default Change;
