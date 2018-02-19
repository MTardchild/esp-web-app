import React from 'react';
import Modal from 'react-modal';

export class LocationAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLocation: {}
        };
    }
    getSelectOptionsRooms() {
        return this.props.rooms.map((room) =>
            <option>{room.name}</option>
        );
    }
    getSelectOptionsDoors() {
        return this.props.doors.map((door) =>
            <option>{door.name}</option>
        );
    }
    getSelectOptionsWindows() {
        return this.props.windows.map((windows) =>
            <option>{windows.name}</option>
        );
    }
    render() {
        let selectOptionsRooms = this.getSelectOptionsRooms();
        let selectOptionsDoors = this.getSelectOptionsDoors();
        let selectOptionsWindows = this.getSelectOptionsWindows();

        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Location Modal">
                <h1>Add Location</h1>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input type="text" className="form-control"/>
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
                        <span className="input-group-text">Door</span>
                    </div>
                    <select className="form-control">
                        {selectOptionsDoors}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Window</span>
                    </div>
                    <select className="form-control">
                        {selectOptionsWindows}
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
