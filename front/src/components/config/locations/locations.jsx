import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {LocationAddModal} from './locationAddModal'
import update from "immutability-helper/index";
import {withAlert} from "react-alert";
import {ObjectFormatterGrid} from "../formatterGrid/objectFormatterGrid";

const {Editors} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

export class Locations extends React.Component {
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

    createRow = (location) => {
        let newLocation = {};
        newLocation.id = this.getFreeId();
        newLocation.name = location.name;
        if (location.roomId > 0) {
            let roomIndex = this.props.rooms.map((room) => room.id).indexOf(location.roomId);
            newLocation.room = this.props.rooms[roomIndex];
        } else {
            newLocation.room = {id: 0, name: ""}
        }

        if (location.doorId > 0) {
            let doorIndex = this.props.doors.map((door) => door.id).indexOf(location.doorId);
            newLocation.door = this.props.doors[doorIndex];
        } else {
            newLocation.door = {id: 0, name: ""}
        }

        if (location.windowId > 0) {
            let windowIndex = this.props.windows.map((window) => window.id).indexOf(location.windowId);
            newLocation.window = this.props.windows[windowIndex];
        } else {
            newLocation.window = {id: 0, name: ""}
        }
        newLocation.buttons = this.getButtons(newLocation.id);
        return newLocation;
    };

    createRows = () => {
        return this.props.locations.map((location) =>
            ({
                id: location.id,
                name: location.name,
                room: location.room,
                door: location.door,
                window: location.window,
                buttons: this.getButtons(location.id)
            }));
    };

    getButtons = (locationId) => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(locationId)}>Delete
                </button>
            </div>
        );
    };

    getDropdownOptionRooms = () => {
        let options = [{id: 0, title: <div style={{height: 20 + 'px'}} id={0}/>, text: "", value: ""}];
        this.props.rooms.map((room) => {
                options.push({
                    id: room.id,
                    title: <div id={room.id}>{room.name}</div>,
                    text: room.name,
                    value: room.name
                });
            }
        );
        return options;
    };

    getDropdownOptionDoors = () => {
        let options = [{id: 0, title: <div style={{height: 20 + 'px'}} id={0}/>, text: "", value: ""}];
        this.props.doors.map((door) => {
                options.push({
                    id: door.id,
                    title: <div id={door.id}>{door.name}</div>,
                    text: door.name,
                    value: door.name
                });
            }
        );
        return options;
    };

    getDropdownOptionWindows = () => {
        let options = [{id: 0, title: <div style={{height: 20 + 'px'}} id={0}/>, text: "", value: ""}];
        this.props.windows.map((window) => {
                options.push({
                    id: window.id,
                    title: <div id={window.id}>{window.name}</div>,
                    text: window.name,
                    value: window.name
                });
            }
        );
        return options;
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
            editor: <AutoCompleteEditor options={this.getDropdownOptionRooms()}/>,
            formatter: ObjectFormatterGrid
        },
        {
            key: 'door',
            name: 'Door',
            editor: <AutoCompleteEditor options={this.getDropdownOptionDoors()}/>,
            formatter: ObjectFormatterGrid
        },
        {
            key: 'window',
            name: 'Window',
            editor: <AutoCompleteEditor options={this.getDropdownOptionWindows()}/>,
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

    handleGridAdd = (location) => {
        let rows = this.state.rows.slice();
        let newLocation = this.createRow(location);
        rows.push(newLocation);
        this.setState({rows: rows});
        this.updateServer("insert", newLocation);
        this.closeModal();
    };

    handleGridDelete = (locationId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(locationId);
        rows.splice(rowIndex, 1);
        this.updateServer("delete", {id: locationId});
        this.setState({rows: rows});
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        // Cancer code to make this shitty dropdown work the way I need it
        if (updated.hasOwnProperty('room') && updated.room.props !== undefined) {
            updated = {
                room: {
                    id: updated.room.props.id,
                    name: updated.room.props.children
                }
            };
        }

        if (updated.hasOwnProperty('door') && updated.door.props !== undefined) {
            updated = {
                door: {
                    id: updated.door.props.id,
                    name: updated.door.props.children
                }
            };
        }

        if (updated.hasOwnProperty('window') && updated.window.props !== undefined) {
            updated = {
                window: {
                    id: updated.window.props.id,
                    name: updated.window.props.children
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

    updateServer = (action, location) => {
        let update = {
            action: action,
            location: location
        };
        console.log(update);

        let formData = new FormData();
        formData.append('LocationUpdate', JSON.stringify(update));
        this.props.alert.show('Updating ID: ' + location.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => {
                this.props.alert.success('Updated ID: ' + location.id);
                this.props.updateAppState();
            })
            .catch((err) => this.props.alert.error('Failed updating ID: ' + location.id));
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
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Location</button>
                </div>
                <ReactDataGrid
                    minHeight={85 + 'vh'}
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

export default withAlert(Locations)