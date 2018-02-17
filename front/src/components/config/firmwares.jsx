import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class Firmwares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
    createRows = () => {
        return this.props.firmwares.map((firmware) =>
            ({id: firmware.id,
                name: firmware.name,
                path: firmware.path,
                timestamp: firmware.timestamp}));
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
            key: 'path',
            name: 'Path',
            editable: true
        },
        {
            key: 'timestamp',
            name: 'Timestamp'
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    render() {
        return (
            <div>
                <div class="table-toolbar">
                    <button className="btn btn-primary">Add Firmware</button>
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