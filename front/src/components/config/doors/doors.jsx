import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {DoorAddModal} from "./doorAddModal";
import update from "immutability-helper/index";
const { Editors, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

export class Doors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
    createRows = () => {
        return this.props.doors.map((door) =>
            ({id: door.id,
                name: door.name,
                room1: door.room1.name,
                room2: door.room2.name,
                buttons: this.getButtons(door.id)}));
    };
    createRow = (door) => {
        let newDoor = {};
        newDoor.id = this.getFreeId();
        newDoor.name = door.name;
        let room1Index = this.props.rooms.map((room) => room.id).indexOf(door.room1Id);
        newDoor.room1 = this.props.rooms[room1Index].name;
        if (door.room2Id > 0) {
            let room2Index = this.props.rooms.map((room) => room.id).indexOf(door.room2Id);
            newDoor.room2 = this.props.rooms[room2Index].name;
        }
        newDoor.buttons = this.getButtons(newDoor.id);
        return newDoor;
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
    getButtons = (doorId) => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(doorId)}>Delete</button>
            </div>
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
            key: 'room1',
            name: 'Adjacent Room',
            editor: this.RoomEditor
        },
        {
            key: 'room2',
            name: 'Adjacent Room',
            editor: this.RoomEditor
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
    handleGridDelete = (doorId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(doorId);
        rows.splice(rowIndex, 1);
        this.setState({rows: rows});
    };
    openModal = () => {
        this.setState({isModalOpen: true});
    };
    closeModal = () => {
        this.setState({isModalOpen: false});
    };
    handleGridAdd = (door) => {
        let rows = this.state.rows.slice();
        let newDoor = this.createRow(door);
        rows.push(newDoor);
        this.setState({rows: rows});
        this.closeModal();
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
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Door</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>

                <DoorAddModal isModalOpen={this.state.isModalOpen}
                              closeModal={this.closeModal}
                              rooms={this.props.rooms}
                              add={this.handleGridAdd}
                              freeId={this.getFreeId()}/>
            </div>
        );
    }
}