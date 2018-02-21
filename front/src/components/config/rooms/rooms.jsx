import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {RoomAddModal} from "./roomAddModal";
import update from "immutability-helper/index";
import {withAlert} from "react-alert";

export class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
    createRow = (room) => {
        let newRoom = {};
        newRoom.id = this.getFreeId();
        newRoom.name = room.name;
        newRoom.buttons = this.getButtons(newRoom.id);
        return newRoom;
    };
    createRows = () => {
        return this.props.rooms.map((room) =>
            ({id: room.id,
                name: room.name,
                buttons: this.getButtons(room.id)}));
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
            key: "buttons",
            name: "",
            width: 75
        }
    ];
    getButtons = (roomId) => {
        return (
            <div className="justify-content-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(roomId)}>Delete</button>
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
    handleGridAdd = (room) => {
        let rows = this.state.rows.slice();
        let newRoom = this.createRow(room);
        rows.push(newRoom);
        this.setState({rows: rows});
        this.closeModal();
    };
    handleGridDelete = (roomId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(roomId);
        rows.splice(rowIndex, 1);
        this.setState({rows: rows});
    };
    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = update(rows[i], {$merge: updated});
            this.updateServer(rows[i]);
        }

        this.setState({ rows });
    };
    updateServer = (room) => {
        let formData = new FormData();
        formData.append('RoomUpdate', JSON.stringify(room));
        this.props.alert.show('Updating ID: ' + room.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => this.props.alert.success('Updated ID: ' + room.id))
            .catch((err) => this.props.alert.error('Failed updating ID: ' + room.id));
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
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Room</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>

                <RoomAddModal isModalOpen={this.state.isModalOpen}
                              closeModal={this.closeModal}
                              add={this.handleGridAdd}
                              freeId={this.getFreeId()}/>
            </div>
        );
    }
}

export default withAlert(Rooms)