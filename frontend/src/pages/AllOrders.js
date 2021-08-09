import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Axios from "axios";
import { BASE_URL } from "../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import "../App.js";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";
import ModalDialog from "../components/ModalDialog";
import DeliveryInsert from "../components/DeliveryInsert";
import getAuthHeader from "../GetHeader";
class AllOrders extends Component {
    state = {
        reservations: [],
        openModal: false,
        openModal2: false,
        openModal3: false,
        couriers: [],
        selectedCourier: "",
        selectedOrder: "",

    };
    handleColorChange = (e) => {

		let u = [];
		this.setState({ selectedCourier: e.target.value }, () => {
			console.log(this.state);
		});
		
	
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
        if (!this.hasRole("ROLE_USER")) {
            this.setState({ redirect: true });
        } else {
        Axios.get(BASE_URL + "/api/reservations/allUser", { validateStatus: () => true, headers: { Authorization: getAuthHeader() }})
            .then((res) => {
                this.setState({ reservations: res.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
        Axios.get(BASE_URL + "/api/reservations/all", { validateStatus: () => true, headers: { Authorization: getAuthHeader() }})
            .then((res) => {
                this.setState({ reservations: res.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }


        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
        Axios.get(BASE_URL + "/api/reservations/couriers", { validateStatus: () => true, headers: { Authorization: getAuthHeader() }})
            .then((res) => {
                this.setState({ couriers: res.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

    };


    handleModalClose = () => {
        this.setState({ openModal: false, redirect: false });
    };
    handleModalClose2 = () => {
        this.setState({ openModal2: false, redirect: false });
        window.location.reload();
    };
    handleRemove = (e,reservation) => {

        Axios.get(BASE_URL + "/api/reservations/remove/" + reservation.reservationId)
        .then((res) => {
            this.setState({ reservations: res.data });
            console.log(res.data);
            this.setState({ openModal: true });
        })
        .catch((err) => {
            console.log(err);
        });

    };

    handleQR = (e,reservation) => {
        this.setState({ selectedOrder: reservation });
        this.setState({ openModal3: true });

        
       
    };

    send = (e,courier, order) => {

        let id = ""
        this.state.couriers.forEach((cour) =>{
            if(cour.company === courier){
                id = cour.id
            }
        })
       


        Axios.get(BASE_URL + "/api/reservations/generateQR/" + order.reservationId + "/" + id)
        .then((res) => {
          
            console.log(res.data);
            this.setState({ openModal2: true });
        })
        .catch((err) => {
            console.log(err);
        });
       
    };

    render() {
        

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
                                        <img className="img-fluid" src={reservation.files?.[0] ?? PharmacyLogo} width="70em" />
                                    </td>
                                    <td>
                                    <div>
                                            <b>STATUS: </b> {reservation.status}
                                        </div>
                                        <div>
                                            <b>Date of reservation: </b> {new Date(reservation.dateOfReservation).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <b>Due date: </b> {new Date(reservation.dueDate).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <b>User: </b> {reservation.user}
                                        </div>
                                        <div>
                                            <b>Contact number: </b> {reservation.phone}
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

                                        <div  hidden={!this.hasRole("ROLE_USER")}>  <button
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

                                    <div  hidden={!this.hasRole("ROLE_ADMIN") ||  reservation.status==="SENT"}>  <button
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
                                            Decline
									</button></div>

                                    <div  hidden={!this.hasRole("ROLE_ADMIN") || reservation.status==="SENT"}>  <button
                                            style={{
                                                background: "#1977cc",
                                                marginTop: "15px",
                                                marginLeft: "40%",
                                                width: "20%",
                                            }}
                                            onClick={(e) => this.handleQR(e, reservation)}
                                            className="btn btn-primary btn-xl"
                                            id="sendMessageButton"
                                            type="button"
                                        >
                                            Order sent
									</button></div>

                                   

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ModalDialog
                    show={this.state.openModal}
                    onCloseModal={this.handleModalClose}
                    header="Success"
                    text="You have successfully removed this order."
                />

                <ModalDialog
                    show={this.state.openModal2}
                    onCloseModal={this.handleModalClose2}
                    header="Success"
                    text="You have successfully sent this order and made a QR code."
                />      

                <DeliveryInsert
                    show={this.state.openModal3}
                    onCloseModal={this.handleModalClose3}
                    header="Insert a courier"
                    text="Insert a courier: "
                    couriers = {this.state.couriers}
                    selectedCourier = {this.state.selectedCourier}
                    handleColorChange = {this.handleColorChange}
                    selectedOrder = {this.state.selectedOrder}
                    send = {this.send}
                />   

            </React.Fragment>
        );
    }
}

export default AllOrders;

