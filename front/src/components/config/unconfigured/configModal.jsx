import React from 'react';
import Modal from 'react-modal';
import {withAlert} from "react-alert";
import {AddedComponents} from "../AddedComponents";

export class ConfigModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            esp: {
                name: "",
                ip: "",
                locationId: 1,
                components: [],
                hardwareId: this.props.hardwareId
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
        let formData = new FormData();
        formData.append('Config', JSON.stringify(this.state.esp));
        console.log(formData);

        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res.text().then(function (text) {
            console.log(text);
        })).then((data) => {
            console.log(data);
            this.props.alert.success('Configured ' + this.state.esp.name + ' ...');
        })
            .catch((err) => {
                console.log(err);
                this.props.alert.error('Failed configuring ' + this.state.esp.name + '.')
            });
    };

    onNameChanged = (event) => {
        let esp = this.state.esp;
        esp.name = event.currentTarget.value;
        this.setState({esp: esp});
    };

    onIpChanged = (event) => {
        let esp = this.state.esp;
        esp.ip = event.currentTarget.value;
        this.setState({esp: esp});
    };

    onLocationChanged = (event) => {
        let esp = this.state.esp;
        esp.locationId = event.currentTarget.value;
        this.setState({esp: esp});
    };

    onComponentAdded = (typeId) => {
        let esp = this.state.esp;
        esp.components.push({typeId: typeId});
        this.setState({esp: esp});
    };

    onComponentRemoved = (typeId) => {
        let esp = this.state.esp;
        esp.components.splice(esp.components.findIndex(component => component.typeId === typeId), 1);
        this.setState({esp: esp});
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Config Modal">
                <h1>Configurate ESP</h1>
                <hr/>
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

                <div className="text-center">
                    <h2>Add Components</h2>
                    <img src="public/img/ledStrip.png" width={150} alt="" className="img-thumbnail margin-x-sm"
                         onClick={() => this.onComponentAdded(3)}/>
                    <img src="public/img/switch.png" width={150} alt="" className="img-thumbnail margin-x-sm"
                         onClick={() => this.onComponentAdded(2)}/>
                    <img src="public/img/temperature.png" width={150} alt="" className="img-thumbnail margin-x-sm"
                         onClick={() => this.onComponentAdded(1)}/>
                </div>
                <div className="text-center">
                    <AddedComponents components={this.state.esp.components} remove={this.onComponentRemoved}/>
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