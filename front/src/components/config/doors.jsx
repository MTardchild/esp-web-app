import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {DoorAddModal} from "./doorAddModal";
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
                room2: door.room2.name}));
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
            key: 'room1',
            name: 'Adjacent Room',
            editor: this.RoomEditor
        },
        {
            key: 'room2',
            name: 'Adjacent Room',
            editor: this.RoomEditor
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    handleAddRow = ({ newRowIndex }) => {
        const newRow = {
            id: newRowIndex,
            name: '',
            room1: '',
            room2: ''
        };

        let rows = this.state.rows.slice();
        rows.push(newRow);
        this.setState({ rows });
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
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Door</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <DoorAddModal isModalOpen={this.state.isModalOpen}
                              closeModal={this.closeModal}
                              rooms={this.props.rooms}/>
            </div>
        );
    }
}