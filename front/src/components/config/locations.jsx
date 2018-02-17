import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
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
            name: 'Room'
        },
        {
            key: 'door',
            name: 'Door'
        },
        {
            key: 'window',
            name: 'Window'
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    render() {
        return (
            <div>
                <div class="table-toolbar">
                    <button className="btn btn-primary">Add Location</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>
            </div>
        );
    }
}