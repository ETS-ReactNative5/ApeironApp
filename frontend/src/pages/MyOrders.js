import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Axios from "axios";
import { BASE_URL } from "../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import "../App.js";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";
import getAuthHeader from "../GetHeader";

class MyOrders extends Component {
    state = {
        reservations: [],

    };


    componentDidMount() {
        Axios.get(BASE_URL + "/api/reservations/allUser", {headers: { Authorization: getAuthHeader() }})
            .then((res) => {
                this.setState({ reservations: res.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    handleRemove = (e,reservation) => {

        Axios.get(BASE_URL + "/api/reservations/remove/" + reservation.reservationId)
        .then((res) => {
            this.setState({ reservations: res.data });
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        window.location.reload(false);

    };


  

    render() {
        if (this.state.redirect) return <Redirect push to={this.state.redirectUrl} />;

        return (
            <React.Fragment>
        
                <TopBar />
                <Header />

                <div className="container" style={{ marginTop: "10%" }}>
                    <h5 className=" text-center mb-0 mt-2 text-uppercase">My orders</h5>


                    <table className="table table-hover" style={{ width: "100%", marginTop: "3rem" }}>
                        <tbody>
                            {this.state.reservations.map((reservation) => (
                                <tr
                                    id={reservation.id}
                                    key={reservation.id}
                                    style={{ cursor: "pointer" }}

                                >
                                    <td width="130em">
                                        <img className="img-fluid"  src={reservation.files?.[0] ?? PharmacyLogo} width="70em" />
                                    </td>
                                    <td>
                                        <div>
                                            <b>Date of reservation: </b> {new Date(reservation.dateOfReservation).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <b>Due date: </b> {new Date(reservation.dueDate).toLocaleDateString()}
                                        </div>
                                        <div>  <b>Item type: </b>
                                            {reservation.itemType} </div>
                                        <div>  <b>Item gender: </b>
                                            {reservation.itemGender}</div>
                                        <div>  <b>Item name: </b>
                                            {reservation.itemName}</div>


                                        <div>
                                            <b>Reserved color and size: </b>
                                            {reservation.itemInOrderDTOSet.map((item) => (
                                                <div>  <b>Item color: </b>
                                                {item.color}    
                                                <b>Item size: </b>
                                                {item.size}
                                                
                                                <b>Item quantity: </b>
                                                {item.quantity}</div>


                                            ))}

                                        </div>

                                        <div>  <button
                                            style={{
                                                background: "#1977cc",
                                                marginTop: "15px",
                                                marginLeft: "40%",
                                                width: "20%",
                                            }}
                                            onClick={(e) => this.handleRemove(e, reservation)}
                                            className="btn btn-primary btn-xl"
                                            id="sendMessageButton"
                                            type="button"
                                        >
                                            Remove
									</button></div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </React.Fragment>
        );
    }
}

export default MyOrders;

