import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {WindowAddModal} from "./windowAddModal";
const { Editors, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

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
                room: window.room.name,
                buttons: this.getButtons()}));
    };
    getDropdownOptions = () => {
        return this.props.rooms.map((room) =>
            {
                let roomDropdown = room;
                roomDropdown.title = room.name;
                return roomDropdown;
            }
        );
    };
    RoomEditor = <AutoCompleteEditor options={this.getDropdownOptions()} />;
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
            key: "buttons",
            name: "",
            width: 75
        }
    ];
    getButtons = () => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm">Delete</button>
            </div>
        );
    };
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