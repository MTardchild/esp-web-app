import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {LocationAddModal} from './locationAddModal'
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
    createRows = () => {
        return this.props.locations.map((location) =>
            ({id: location.id,
                name: location.name,
                room: location.room.name,
                door: location.door.name,
                window: location.window.name}));
    };
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
                <div className="table-toolbar">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Location</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <LocationAddModal
                    rooms={this.props.rooms}
                    doors={this.props.doors}
                    windows={this.props.windows}
                    isModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal}/>
            </div>
        );
    }
}