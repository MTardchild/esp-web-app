import React from 'react';
import Modal from 'react-modal';

export class DoorAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            door: {
                name: "",
                room1Id: this.props.rooms[0].id,
                room2Id: 0
            }
        };
    }
    getSelectOptionsRooms() {
        return this.props.rooms.map((room) =>
            <option value={room.id}>{room.name}</option>
        );
    }
    onNameChanged = (event) => {
        let door = this.state.door;
        door.name = event.currentTarget.value;
        this.setState({door: door});
    };
    onRoom1Changed = (event) => {
        let door = this.state.door;
        door.room1Id = event.currentTarget.value;
        this.setState({door: door});
    };
    onRoom2Changed = (event) => {
        let door = this.state.door;
        door.room2Id = event.currentTarget.value;
        this.setState({door: door});
    };
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
                            <input type="text" className="form-control" value={this.state.door.name}
                                    onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room</span>
                    </div>
                    <select className="form-control" value={this.state.door.room1Id}
                            onChange={this.onRoom1Changed}>
                        {selectOptionsRooms}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room</span>
                    </div>
                    <select className="form-control" value={this.state.door.room2Id}
                            onChange={this.onRoom2Changed}>
                        <option value={0} />
                        {selectOptionsRooms}
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.door)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
