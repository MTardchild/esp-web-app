import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class UnconfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
    createRows = () => {
        return this.props.unconfiguredEsps.map((esp) =>
            ({  ssid: "",
                mode: "",
                channel: "",
                rate: "",
                strength: "",
                security: ""}));
    };
    columns = [
        {
            key: 'ssid',
            name: 'SSID',
            width: 80
        },
        {
            key: 'mode',
            name: 'Mode'
        },
        {
            key: 'channel',
            name: 'Channel'
        },
        {
            key: 'rate',
            name: 'Rate'
        },
        {
            key: 'strength',
            name: 'Signal Strength'
        },
        {
            key: 'security',
            name: 'Security'
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