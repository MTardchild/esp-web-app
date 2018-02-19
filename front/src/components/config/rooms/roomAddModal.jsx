import React from 'react';
import Modal from 'react-modal';

export class RoomAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                name: ""
            }
        };
    }
    onNameChanged = (event) => {
        let room = this.state.room;
        room.name = event.currentTarget.value;
        this.setState({room: room});
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Room Modal">
                <h1>Add Room</h1>
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
                            <input type="text" className="form-control" value={this.state.room.name}
                                   onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.props.closeModal}>Close</button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.room)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
