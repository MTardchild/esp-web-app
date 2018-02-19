import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {WindowAddModal} from "./windowAddModal";

export class Windows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
    createRows = () => {
        return this.props.windows.map((window) =>
            ({id: window.id,
                name: window.name,
                room: window.room.name}));
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
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
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
                <div className="table-toolbar">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Window</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <WindowAddModal isModalOpen={this.state.isModalOpen}
                                closeModal={this.closeModal}
                                rooms={this.props.rooms}/>
            </div>
        );
    }
}