import React from 'react';
import Modal from 'react-modal';

export class LocationAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                name: "",
                roomId: 0,
                doorId: 0,
                windowId: 0
            }
        };
    }
    getSelectOptionsRooms() {
        return this.props.rooms.map((room) =>
            <option value={room.id}>{room.name}</option>
        );
    }
    getSelectOptionsDoors() {
        return this.props.doors.map((door) =>
            <option value={door.id}>{door.name}</option>
        );
    }
    getSelectOptionsWindows() {
        return this.props.windows.map((window) =>
            <option value={window.id}>{window.name}</option>
        );
    }
    onNameChanged = (event) => {
        let location = this.state.location;
        location.name = event.currentTarget.value;
        this.setState({location: location});
    };
    onRoomChanged = (event) => {
        let location = this.state.location;
        location.roomId = event.currentTarget.value;
        this.setState({location: location});
    };
    onDoorChanged = (event) => {
        let location = this.state.location;
        location.doorId = event.currentTarget.value;
        this.setState({location: location});
    };
    onWindowChanged = (event) => {
        let location = this.state.location;
        location.windowId = event.currentTarget.value;
        this.setState({location: location});
    };
    render() {
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
                            <input disabled={true} type="text" className="form-control" value={this.props.freeId}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.location.name}
                                   onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 85 + "px"}}>Room</span>
                    </div>
                    <select className="form-control" value={this.state.location.roomId}
                            onChange={this.onRoomChanged}>
                        <option value={0}/>
                        {this.getSelectOptionsRooms()}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 85 + "px"}}>Door</span>
                    </div>
                    <select className="form-control" value={this.state.location.doorId}
                            onChange={this.onDoorChanged}>
                        <option value={0}/>
                        {this.getSelectOptionsDoors()}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 85 + "px"}}>Window</span>
                    </div>
                    <select className="form-control" value={this.state.location.windowId}
                            onChange={this.onWindowChanged}>
                        <option value={0}/>
                        {this.getSelectOptionsWindows()}
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.location)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
