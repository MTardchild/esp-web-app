import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {FirmwareAddModal} from './firmwareAddModal'
import update from "immutability-helper/index";
import {withAlert} from "react-alert";

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
            ({
                id: firmware.id,
                name: firmware.name,
                path: firmware.path,
                timestamp: firmware.timestamp,
                buttons: this.getButtons(firmware.id)
            }));
    };

    getButtons = (firmwareId) => {
        return (
            <div className="text-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(firmwareId)}>Delete
                </button>
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

    handleGridAdd = (firmware) => {
        let rows = this.state.rows.slice();
        firmware.id = this.getFreeId();
        firmware.buttons = this.getButtons(firmware.id);
        rows.push(firmware);
        this.updateServer("insert", firmware);
        this.setState({rows: rows});
        this.closeModal();
    };

    handleGridDelete = (firmwareId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(firmwareId);
        rows.splice(rowIndex, 1);
        this.updateServer("delete", {id: firmwareId});
        this.setState({rows: rows});
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = update(rows[i], {$merge: updated});
            this.updateServer("update", rows[i]);
        }

        this.setState({rows});
    };

    getFreeId = () => {
        let freeId = 1;
        if (this.state.rows.length > 0)
            freeId = parseInt(this.state.rows[this.state.rows.length - 1].id, 10) + 1;
        return freeId;
    };

    updateServer = (action, firmware) => {
        let update = {
            action: action,
            firmware: firmware
        };

        let formData = new FormData();
        formData.append('FirmwareUpdate', JSON.stringify(update));
        this.props.alert.show('Updating ID: ' + firmware.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => {
                this.props.alert.success('Updated ID: ' + firmware.id);
                this.props.updateAppState();
            })
            .catch((err) => this.props.alert.error('Failed updating ID: ' + firmware.id));
    };

    render() {
        return (
            <div>
                <div className="table-toolbar float-right">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Firmware</button>
                </div>
                <ReactDataGrid
                    minHeight={85 + 'vh'}
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>

                <FirmwareAddModal isModalOpen={this.state.isModalOpen}
                                  closeModal={this.closeModal}
                                  add={this.handleGridAdd}
                                  freeId={this.getFreeId()}/>
            </div>
        );
    }
}

export default withAlert(Firmwares)