import React from 'react';
import Modal from 'react-modal';

export class WifiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFirmware: {}
        };
    }
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
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">SSID</span>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Password</span>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md">Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
