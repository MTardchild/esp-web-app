import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {FirmwareAddModal} from './firmwareAddModal'

export class Firmwares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
    createRows = () => {
        return this.props.firmwares.map((firmware) =>
            ({id: firmware.id,
                name: firmware.name,
                path: firmware.path,
                timestamp: firmware.timestamp,
                buttons: this.getButtons()}));
    };
    getButtons = () => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm">Delete</button>
            </div>
        );
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
            key: 'path',
            name: 'Path',
            editable: true
        },
        {
            key: 'timestamp',
            name: 'Timestamp'
        },
        {
            key: "buttons",
            name: "",
            width: 75
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
                <div className="table-toolbar float-right">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Firmware</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <FirmwareAddModal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} />
            </div>
        );
    }
}