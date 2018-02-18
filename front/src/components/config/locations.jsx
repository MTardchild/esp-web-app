import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Modal from 'react-modal';

export class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false,
            newLocation: {}
        };
    }
    createRows = () => {
        return this.props.locations.map((location) =>
            ({id: location.id,
                name: location.name,
                room: location.room.name,
                door: location.door.name,
                window: location.window.name}));
    };
    columns = [
        {
            key: 'id',
            name: 'ID',
            width: 80
        },
        {
            key: 'name',
            name: 'Name',
            editable: true
        },
        {
            key: 'room',
            name: 'Room'
        },
        {
            key: 'door',
            name: 'Door'
        },
        {
            key: 'window',
            name: 'Window'
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    handleAddRow = () => {
        const newRow = {
            id: parseInt(this.state.rows[this.state.rows.length-1].id) + 1,
            name: "",
            room: "",
            timestamp: Date.now()
        };

        let newRows = this.state.rows.slice();
        newRows.push(newRow);

        this.setState({rows: newRows})
    };
    openModal = () => {
        this.setState({isModalOpen: true});
    };
    closeModal = () => {
        this.setState({isModalOpen: false});
    };
    render() {
        return (
            <div>
                <div class="table-toolbar">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Location</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <Modal
                    isOpen={this.state.isModalOpen}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Add Location Modal">
                    <h1>Add Location</h1>
                    <div className="row">
                        <div className="col-2">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
                                </div>
                                <input type="text" className="form-control" aria-label="new-location-id" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                                </div>
                                <input type="text" className="form-control" aria-label="new-location-name" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div className="row">
                            <button type="button" class="btn btn-outline-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" class="btn btn-outline-primary">Add</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}