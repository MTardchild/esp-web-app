import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper'
import {withAlert} from "react-alert";
import {ObjectFormatterGrid} from "../formatterGrid/objectFormatterGrid";

const {Editors} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

export class ConfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }

    getDropdownOptionLocations = () => {
        return this.props.locations.map((location) => {
                return {
                    id: location.id,
                    title: <div id={location.id}>{location.name}</div>,
                    text: location.name,
                    value: location.name
                };
            }
        );
    };

    columns = [
        {
            key: 'id',
            name: 'ID',
            width: 80
        },
        {
            key: 'hwId',
            name: "Hardware ID"
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
            name: 'Location',
            editor: <AutoCompleteEditor options={this.getDropdownOptionLocations()}/>,
            formatter: ObjectFormatterGrid
        }
    ];

    createRows = () => {
        return this.props.esps.map((esp) =>
            ({
                id: esp.id,
                name: esp.name,
                hwId: esp.hwId,
                ip: esp.ip,
                location: esp.location
            }));
    };

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        if (updated.hasOwnProperty('location')) {
            updated = {
                location: {
                    id: updated.location.props.id,
                    name: updated.location.props.children
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

    updateServer = (action, esp) => {
        let update = {
            action: action,
            esp: esp
        };

        let formData = new FormData();
        formData.append('EspUpdate', JSON.stringify(update));
        this.props.alert.show('Updating ID: ' + esp.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => {
                this.props.alert.success('Updated ID: ' + esp.id);
                this.props.updateAppState();
            })
            .catch((err) => this.props.alert.error('Failed updating ID: ' + esp.id));
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

export default withAlert(ConfiguredEsps)