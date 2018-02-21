import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {WindowAddModal} from "./windowAddModal";
import update from "immutability-helper/index";
import {ObjectFormatterGrid} from "../formatterGrid/objectFormatterGrid";
import {withAlert} from "react-alert";

const {Editors} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

export class Windows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    createRow = (window) => {
        let roomIndex = this.props.rooms.map((room) => room.id).indexOf(window.roomId);
        let freeId = this.getFreeId();

        return {
            id: freeId,
            name: window.name,
            room: this.props.rooms[roomIndex],
            buttons: this.getButtons(freeId)
        };
    };

    createRows = () => {
        return this.props.windows.map((window) =>
            ({
                id: window.id,
                name: window.name,
                room: window.room,
                buttons: this.getButtons(window.id)
            }));
    };

    getDropdownOptions = () => {
        return this.props.rooms.map((room) => {
                return {
                    id: room.id,
                    title: <div id={room.id}>{room.name}</div>,
                    text: room.name,
                    value: room.name
                };
            }
        );
    };

    getButtons = (windowId) => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(windowId)}>Delete
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
            key: 'room',
            name: 'Room',
            editor: <AutoCompleteEditor options={this.getDropdownOptions()}/>,
            formatter: ObjectFormatterGrid
        },
        {
            key: "buttons",
            name: "",
            width: 75
        }
    ];

    openModal = () => {
        this.setState({isModalOpen: true});
    };

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    handleGridAdd = (window) => {
        let rows = this.state.rows.slice();
        let newWindow = this.createRow(window);
        rows.push(newWindow);
        this.setState({rows: rows});
        this.updateServer("insert", newWindow);
        this.closeModal();
    };

    handleGridDelete = (windowId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(windowId);
        rows.splice(rowIndex, 1);
        this.setState({rows: rows});
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        // Cancer code to make this shitty dropdown work the way I need it
        if (updated.hasOwnProperty('room')) {
            updated = {
                room: {
                    id: updated.room.props.id,
                    name: updated.room.props.children
                }
            };
        }

        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = update(rows[i], {$merge: updated});
            this.updateServer("update", rows[i]);
        }

        this.setState({rows});
    };

    updateServer = (action, window) => {
        let update = {
            action: action,
            window: window
        };

        let formData = new FormData();
        formData.append('WindowUpdate', JSON.stringify(update));
        this.props.alert.show('Updating ID: ' + window.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => this.props.alert.success('Updated ID: ' + window.id))
            .catch((err) => this.props.alert.error('Failed updating ID: ' + window.id));
    };

    getFreeId = () => {
        let freeId = 1;
        if (this.state.rows.length > 0)
            freeId = parseInt(this.state.rows[this.state.rows.length - 1].id, 10) + 1;
        return freeId;
    };

    render() {
        return (
            <div>
                <div className="table-toolbar float-right">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Window</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>

                <WindowAddModal isModalOpen={this.state.isModalOpen}
                                closeModal={this.closeModal}
                                rooms={this.props.rooms}
                                add={this.handleGridAdd}
                                freeId={this.getFreeId()}/>
            </div>
        );
    }
}

export default withAlert(Windows)