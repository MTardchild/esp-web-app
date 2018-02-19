import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper'

export class ConfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
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
            key: 'ip',
            name: 'IP-Address',
            editable: true
        },
        {
            key: 'location',
            name: 'Location'
        }
    ];
    createRows = () => {
        return this.props.esps.map((esp) =>
            ({id: esp.id,
              name: esp.name,
              ip: esp.ip,
              location: esp.location.name}));
    };
    rowGetter = (i) => {
        return this.state.rows[i];
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
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>
            </div>
        );
    }
}