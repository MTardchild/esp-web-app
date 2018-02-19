import React from 'react';
import Modal from 'react-modal';

export class WindowAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            window: {
                name: "",
                roomId: this.props.rooms[0].id
            }
        };
    }
    getSelectOptionsRooms() {
        return this.props.rooms.map((room) =>
            <option value={room.id}>{room.name}</option>
        );
    }
    onNameChanged = (event) => {
        let window = this.state.window;
        window.name = event.currentTarget.value;
        this.setState({window: window});
    };
    onRoomChanged = (event) => {
        let window = this.state.window;
        window.roomId = event.currentTarget.value;
        this.setState({window: window});
    };
    render() {
        let selectOptionsRooms = this.getSelectOptionsRooms();

        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Window Modal">
                <h1>Add Window</h1>
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
                            <input type="text" className="form-control" value={this.state.window.name}
                                   onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room</span>
                    </div>
                    <select className="form-control" value={this.state.window.roomId}
                            onChange={this.onRoomChanged}>
                        {selectOptionsRooms}
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.window)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
