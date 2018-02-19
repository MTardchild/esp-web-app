import React from 'react';
import ReactDataGrid from 'react-data-grid';
import {RoomAddModal} from "./roomAddModal";

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
                buttons: this.getButtons()}));
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
                <div className="table-toolbar">
                    <button className="btn btn-outline-primary" onClick={this.openModal}>Add Room</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>

                <RoomAddModal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} />
            </div>
        );
    }
}