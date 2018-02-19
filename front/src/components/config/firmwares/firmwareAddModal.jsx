import React from 'react';
import Modal from 'react-modal';

export class FirmwareAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firmware: {
                name: "",
                path: "",
                timestamp: Date.now()
            }
        };
    }
    onNameChanged = (event) => {
        let firmware = this.state.firmware;
        firmware.name = event.currentTarget.value;
        this.setState({firmware: firmware});
    };
    onPathChanged = (event) => {
        let firmware = this.state.firmware;
        firmware.path = event.currentTarget.value;
        this.setState({firmware: firmware});
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Firmware Modal">
                <h1>Add Firmware</h1>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control"
                                   value={this.props.freeId}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input type="text" className="form-control"
                                   value={this.state.firmware.name} onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Path</span>
                            </div>
                            <input type="text" className="form-control"
                                   value={this.state.firmware.path} onChange={this.onPathChanged}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.firmware)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
