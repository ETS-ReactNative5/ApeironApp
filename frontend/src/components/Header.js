import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    hasRole = (reqRole) => {
        let roles = JSON.parse(localStorage.getItem("keyRole"));

        if (roles === null) return false;

        if (reqRole === "*") return true;

        for (let role of roles) {
            if (role === reqRole) return true;
        }
        return false;
    };

    render() {
        const myStyle = {
            color: "white",
            textAlign: "center",
        };
        return (
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center">
                    <h1 className="logo mr-auto">
                        <Link to="/">Apeiron</Link>
                    </h1>

                    <nav className="nav-menu d-none d-lg-block">
                        <ul>
                            <li className="active">
                                <Link to="/">Home</Link>
                            </li>
                            <li hidden={!this.hasRole("ROLE_PHARMACIST")}>
                                <Link to="/myOrders">My orders</Link>
                            </li>
                            <li hidden={!this.hasRole("ROLE_DERMATHOLOGIST") && !this.hasRole("ROLE_PHARMACIST")}>
                                <Link to="/deliveries">Deliveries</Link>
                            </li>

                            <li className="drop-down">
                                <a href="#">Our products</a>
                                <ul>

                                    <li className="drop-down">
                                        <a href="/tshirts">T-Shirts</a>
                                        <ul>
                                            <li>
                                                <Link to="/tshirts-women">Women</Link>

                                            </li>
                                            <li>
                                                <Link to="/tshirts-men">Men</Link>
                                            </li>


                                        </ul>

                                    </li>
                                    <li>
                                       
                                        <li className="drop-down">
                                        <a href="/hoodies">Hoodies</a>
                                        <ul>
                                            <li>
                                                <Link to="/hoodies-women">Women</Link>

                                            </li>
                                            <li>
                                                <Link to="/hoodies-men">Men</Link>
                                            </li>


                                        </ul>

                                    </li>
                                    </li>
                                    <li>
                                       
                                      
                                        <a href="/hats">Hats</a>
                                        
                                 
                                    </li>

                                </ul>
                            </li>

                            <li >
                                <Link to="/contact">Contact</Link>
                            </li>


                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
