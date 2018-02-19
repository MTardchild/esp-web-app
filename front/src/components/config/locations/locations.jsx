import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {LocationAddModal} from './locationAddModal'
import update from "immutability-helper/index";
const { Editors, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

export class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
    getDropdownOptionRooms = () => {
        return this.props.rooms.map((room) =>
            {
                let roomOptions = room;
                roomOptions.title = room.name;
                return roomOptions;
            }
        );
    };
    getDropdownOptionDoors = () => {
        return this.props.doors.map((door) =>
            {
                let doorOptions = door;
                doorOptions.title = door.name;
                return doorOptions;
            }
        );
    };
    getDropdownOptionWindows = () => {
        return this.props.windows.map((window) =>
            {
                let windowOptions = window;
                windowOptions.title = window.name;
                return windowOptions;
            }
        );
    };
    RoomEditor = <AutoCompleteEditor options={this.getDropdownOptionRooms()} />;
    DoorEditor = <AutoCompleteEditor options={this.getDropdownOptionDoors()} />;
    WindowEditor = <AutoCompleteEditor options={this.getDropdownOptionWindows()} />;
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
            editor: this.RoomEditor
        },
        {
            key: 'door',
            name: 'Door',
            editor: this.DoorEditor
        },
        {
            key: 'window',
            name: 'Window',
            editor: this.WindowEditor
        },
        {
            key: "buttons",
            name: "",
            width: 75
        }
    ];
    createRow = (location) => {
        let newLocation = {};
        newLocation.id = this.getFreeId();
        newLocation.name = location.name;
        if (location.roomId > 0) {
            let roomIndex = this.props.rooms.map((room) => room.id).indexOf(location.roomId);
            newLocation.room = this.props.rooms[roomIndex].name;
        }
        if (location.doorId > 0) {
            let doorIndex = this.props.doors.map((door) => door.id).indexOf(location.doorId);
            newLocation.door = this.props.doors[doorIndex].name;
        }
        if (location.windowId > 0) {
            let windowIndex = this.props.windows.map((window) => window.id).indexOf(location.windowId);
            newLocation.window = this.props.windows[windowIndex].name;
        }
        newLocation.buttons = this.getButtons(newLocation.id);
        return newLocation;
    };
    createRows = () => {
        return this.props.locations.map((location) =>
            ({id: location.id,
                name: location.name,
                room: location.room.name,
                door: location.door.name,
                window: location.window.name,
                buttons: this.getButtons(location.id)}));
    };
    getButtons = (locationId) => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(locationId)}>Delete</button>
            </div>
        );
    };
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
    handleGridAdd = (location) => {
        let rows = this.state.rows.slice();
        let newLocation = this.createRow(location);
        rows.push(newLocation);
        this.setState({rows: rows});
        this.closeModal();
    };
    handleGridDelete = (locationId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(locationId);
        rows.splice(rowIndex, 1);
        this.setState({rows: rows});
    };
    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };
    getFreeId = () => {
        let freeId = 1;
        if (this.state.rows.length > 0)
            freeId = parseInt(this.state.rows[this.state.rows.length-1].id, 10)+1;
        return freeId;
    };
    render() {
        return (
            <div>
                <div className="table-toolbar float-right">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Location</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>

                <LocationAddModal
                    rooms={this.props.rooms}
                    doors={this.props.doors}
                    windows={this.props.windows}
                    isModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal}
                    add={this.handleGridAdd}
                    freeId={this.getFreeId()}/>
            </div>
        );
    }
}