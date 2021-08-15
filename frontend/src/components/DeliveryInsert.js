import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ModalDialog extends Component {
 

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.subheader}</h4>
          <p>{this.props.text}</p>
          <div>
                                        <select
                                            class="btn btn-secondary dropdown-toggle"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{ marginTop: "0.5rem", width: "29em" }}
                                            onChange={(e) => this.props.handleColorChange(e)}
                                            value={this.props.selectedCourier}
                                        >
                                            <option style={{ marginLeft: "12rem" }} value="">
                                                Choose a courier{" "}
                                            </option>
                                            {this.props.couriers.map((chain) => (
                                                <option key={chain.id} value={chain.company}>
                                                    {chain.company}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div>  <button
                                            style={{
                                                background: "#1977cc",
                                                marginTop: "15px",
                                                marginLeft: "40%",
                                                width: "20%",
                                            }}
                                            onClick={(e) => this.props.send(e, this.props.selectedCourier, this.props.selectedOrder)}
                                            className="btn btn-primary btn-xl"
                                            id="sendMessageButton"
                                            type="button"
                                        >
                                            Choose
									</button></div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onCloseModal} href={this.props.href}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalDialog;
