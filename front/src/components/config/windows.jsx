import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class Windows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
    createRows = () => {
        return this.props.windows.map((window) =>
            ({id: window.id,
                name: window.name,
                room: window.room.name}));
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
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    render() {
        return (
            <div>
                <div class="table-toolbar">
                    <button className="btn btn-primary">Add Window</button>
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