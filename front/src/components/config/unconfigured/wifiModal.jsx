import React from 'react';
import Modal from 'react-modal';
import {withAlert} from "react-alert";

export class WifiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ssid: "",
            password: ""
        };
    }
    updateCredentials = () => {
        const self = this;
        fetch(this.getUrl())
            .then(function (response) {
                response.then(function(data) {

                });
            })
            .catch(function (error) {

            });
    };
    getUrl = () => {
        return "";
    };
    onSsidChanged = (event) => {
        this.setState({ssid: event.currentTarget.value})
    };
    onPasswordChanged = (event) => {
        this.setState({password: event.currentTarget.value})
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Update Wifi Modal">
                <h1>Update Wifi Credentials</h1>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">HWID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control" value={this.props.hardwareId}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">SSID</span>
                            </div>
                            <input type="text" className="form-control"
                                   onChange={this.onSsidChanged} value={this.state.ssid}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Password</span>
                            </div>
                            <input type="text" className="form-control"
                                   onChange={this.onPasswordChanged} value={this.state.password}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={this.updateCredentials}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default withAlert(WifiModal)