import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class ConfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
    createRows = () => {
        return this.props.esps.map((esp) =>
            ({id: esp.id,
              name: esp.name,
              ip: esp.ip,
              location: esp.location.name}));
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
            key: 'ip',
            name: 'IP-Address',
            editable: true
        },
        {
            key: 'location',
            name: 'Location'
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    render() {
        return (
            <div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>
            </div>
        );
    }
}