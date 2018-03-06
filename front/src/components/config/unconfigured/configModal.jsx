import React from 'react';
import Modal from 'react-modal';
import {withAlert} from "react-alert";

export class ConfigModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            esp: {
                name: "",
                ip: "",
                locationId: 0,
                components: []
            }
        };
    }

    getSelectOptionsLocations() {
        return this.props.locations.map((location) =>
            <option value={location.id}>{location.name}</option>
        );
    }

    configure = () => {
        const self = this;
        fetch(this.getUrl())
            .then(function (response) {
                response.then(function (data) {

                });
            })
            .catch(function (error) {

            });
    };

    getUrl = () => {
        return "";
    };

    onNameChanged = (event) => {
        this.setState({ssid: event.currentTarget.value});
    };

    onIpChanged = (event) => {
        this.setState({password: event.currentTarget.value});
    };

    onLocationChanged = (event) => {

    };

    onComponentAdded = (typeId) => {

    };

    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Config Modal">
                <h1>Configurate ESP</h1>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">HWID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control" value={this.props.hardwareId}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input type="text" className="form-control"
                                   onChange={this.onNameChanged} value={this.state.esp.name}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">IP</span>
                            </div>
                            <input type="text" className="form-control"
                                   onChange={this.onIpChanged} value={this.state.esp.ip}/>
                        </div>
                    </div>
                    <div className="col">
                        <select className="form-control" value={this.state.esp.locationId}
                                onChange={this.onLocationChanged}>
                            {this.getSelectOptionsLocations()}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="text-center">

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close
                            </button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={this.configure}>Update
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default withAlert(ConfigModal)