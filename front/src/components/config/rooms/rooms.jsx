import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {RoomAddModal} from "./roomAddModal";
import update from "immutability-helper/index";

export class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalOpen: false
        };
    }
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
    handleGridDelete = (roomId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(roomId);
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

                <RoomAddModal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} />
            </div>
        );
    }
}