import React from 'react';
import Modal from 'react-modal';

export class DoorAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFirmware: {}
        };
    }
    getSelectOptionsRooms() {
        return this.props.rooms.map((room) =>
            <option>{room.name}</option>
        );
    }
    render() {
        let selectOptionsRooms = this.getSelectOptionsRooms();

        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Door Modal">
                <h1>Add Door</h1>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control" value={this.props.freeId}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room</span>
                    </div>
                    <select className="form-control">
                        {selectOptionsRooms}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room</span>
                    </div>
                    <select className="form-control">
                        <option />
                        {selectOptionsRooms}
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md">Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
