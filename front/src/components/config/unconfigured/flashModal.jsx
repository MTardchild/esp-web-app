import React from 'react';
import Modal from 'react-modal';

export class FlashModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFirmware: {}
        };
    }
    getSelectOptionsFirmwares() {
        return this.props.firmwares.map((firmware) =>
            <option>{firmware.name + ": " + firmware.path}</option>
        );
    }
    render() {
        let selectOptionsFirmwares = this.getSelectOptionsFirmwares();

        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Flash Modal">
                <h1>Flash New Firmware</h1>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">HWID</span>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Room</span>
                            </div>
                            <select className="form-control">
                                {selectOptionsFirmwares}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md">Flash</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
