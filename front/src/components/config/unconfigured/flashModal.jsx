import React from 'react';
import Modal from 'react-modal';
import {withAlert} from "react-alert";

export class FlashModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFirmwareId: 1
        };
    }

    getSelectOptionsFirmwares() {
        return this.props.firmwares.map((firmware) =>
            <option value={firmware.id}>{firmware.name + ": " + firmware.path}</option>
        );
    }

    flash = () => {
        const self = this;
        self.props.alert.show("Flashing firmware to ESP " + self.props.hardwareId + " ...");
        fetch(this.getUrl())
            .then(function (response) {
                response.then(function (data) {
                    self.props.alert.success("Updated firmware of ESP " + self.props.hardwareId);
                });
            })
            .catch(function (error) {
                self.props.alert.error("Flashing ESP " + self.props.hardwareId + " failed");
            });
        this.props.closeModal();
    };

    getUrl = () => {
        return "?route=ajax&action=flash&firmware=" + this.state.selectedFirmwareId + "&esp=" + this.props.hardwareId;
    };

    onFirmwareSelected = (event) => {
        this.setState({selectedFirmwareId: event.currentTarget.value})
    };

    render() {
        let selectOptionsFirmwares = this.getSelectOptionsFirmwares();

        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Flash Modal">
                <h1>Flash New Firmware</h1>
                <div className="row">
                    <div className="col-4">
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
                                <span className="input-group-text">Firmware</span>
                            </div>
                            <select className="form-control"
                                    value={this.state.selectedFirmwareId}
                                    onChange={this.onFirmwareSelected}>
                                {selectOptionsFirmwares}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close
                            </button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={this.flash}>Flash
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default withAlert(FlashModal)