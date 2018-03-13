import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper'
import {withAlert} from "react-alert";
import {ObjectFormatterGrid} from "../formatterGrid/objectFormatterGrid";
import FlashModal from "../unconfigured/flashModal";
import {ComponentModal} from "./ComponentModal";

const {Editors} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor} = Editors;

export class ConfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalFlashOpen: false,
            isModalComponentOpen: false,
            selectedEsp: this.props.esps.filter(esp => esp.id == 1)[0]
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
            key: 'components',
            name: 'Components'
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
        },
        {
            key: "buttons",
            name: "",
            width: 75
        }
    ];

    onComponentsClicked = (selectedEspId) => {
        this.setState({
            isModalComponentOpen: true,
            selectedEsp: this.props.esps.filter(esp => esp.id == selectedEspId)[0]
        });
    };

    getButtons = (hardwareId) => {
        return (
            <div className="text-center">
                <button className="btn btn-sm btn-outline-primary padding-x-sm"
                        onClick={() => this.openModalFlash(hardwareId)}>Flash
                </button>
            </div>
        );
    };

    createRows = () => {
        return this.props.esps.map((esp) => {
            return {
                id: esp.id,
                name: esp.name,
                hwId: esp.hwId,
                ip: esp.ip,
                location: esp.location,
                components: <span className="clickable"
                                  onClick={() => this.onComponentsClicked(esp.id)}>Components</span>,
                buttons: this.getButtons(esp.hwId)
            }
        });
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

    openModalFlash = (hardwareId) => {
        this.setState({
            isModalFlashOpen: true,
            selectedEsp: this.props.esps.filter(esp => esp.hardwareId == hardwareId)[0]
        });
    };

    closeModalFlash = () => {
        this.setState({isModalFlashOpen: false});
    };

    openModalComponent = (espId) => {
        this.setState({
            isModalComponentOpen: true,
            selectedEsp: this.props.esps.filter(esp => esp.id == espId)[0]
        });
    };

    closeModalComponent = () => {
        this.setState({isModalComponentOpen: false});
    };

    updateServer = (action, esp) => {
        let update = {
            action: action,
            esp: esp
        };

        this.sendRequest(update);
    };

    sendRequest(update) {
        let formData = new FormData();
        formData.append('EspUpdate', JSON.stringify(update));
        this.props.alert.show('Updating ID: ' + update.esp.id + " ...");
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => {
                this.props.alert.success('Updated ID: ' + update.esp.id);
                this.props.updateAppState();
            })
            .catch((err) => this.props.alert.error('Failed updating ID: ' + update.esp.id));
    }

    render() {
        return (
            <div>
                <ReactDataGrid
                    minHeight={85 + 'vh'}
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}/>
                <FlashModal isModalOpen={this.state.isModalFlashOpen}
                            closeModal={this.closeModalFlash}
                            firmwares={this.props.firmwares}
                            hardwareId={this.state.selectedEsp.hardwareId}/>

                <ComponentModal isModalOpen={this.state.isModalComponentOpen}
                                closeModal={this.closeModalComponent}
                                freeId={0}
                                esp={this.state.selectedEsp}/>

            </div>
        );
    }
}

export default withAlert(ConfiguredEsps)