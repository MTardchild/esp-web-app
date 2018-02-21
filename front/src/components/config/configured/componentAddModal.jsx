import React from 'react';
import Modal from 'react-modal';

export class ComponentAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: {
                name: "",
                espId: this.props.espId,
                typeId: 0
            }
        };
    }

    onNameChanged = (event) => {
        let location = this.state.location;
        location.name = event.currentTarget.value;
        this.setState({location: location});
    };

    onTypeChanged = (event) => {

    };

    getSelectOptionsTypes = () => {
        return this.props.componentTypes.map((type) =>
            <option value={type.id}>{type.name}</option>
        );
    };

    render() {
        let selectOptionsTypes = this.getSelectOptionsTypes();
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add Component Modal">
                <h1>Add Component</h1>
                <div className="row">
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control" value={this.props.freeId}/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ESP-ID</span>
                            </div>
                            <input disabled={true} type="text" className="form-control" value={this.props.espId}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.component.name}
                                   onChange={this.onNameChanged}/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Type</span>
                    </div>
                    <select className="form-control" value={this.state.component.typeId}
                            onChange={this.onTypeChanged}>
                        {selectOptionsTypes}
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close
                            </button>
                            <button type="button" className="btn btn-outline-primary margin-left-md"
                                    onClick={() => this.props.add(this.state.component)}>Add
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
