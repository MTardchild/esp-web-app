import React from 'react';
import ReactDataGrid from 'react-data-grid';
import FlashModal from "./flashModal";
import WifiModal from "./wifiModal";

export class UnconfiguredEsps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            isModalWifiOpen: false,
            isModalFlashOpen: false,
            selectedHardwareId: -1
        };
    }
    openModalFlash = (hardwareId) => {
        this.setState({isModalFlashOpen: true,
            selectedHardwareId: hardwareId});
    };
    closeModalFlash = () => {
        this.setState({isModalFlashOpen: false});
    };
    openModalWifi = (hardwareId) => {
        this.setState({isModalWifiOpen: true,
            selectedHardwareId: hardwareId});
    };
    closeModalWifi = () => {
        this.setState({isModalWifiOpen: false});
    };
    getButtons = (hardwareId) => {
        return (
            <div className="float-right">
                <button className="btn btn-sm btn-outline-primary padding-x-sm"
                        onClick={() => this.openModalWifi(hardwareId)}>Update Wifi</button>
                <button className="btn btn-sm btn-outline-primary padding-x-sm margin-left-sm"
                        onClick={() => this.openModalFlash(hardwareId)}>Flash</button>
            </div>
        );
    };
    createRows = () => {
        return [{ ssid: "", hwid: "", mode: "", channel: "", rate: "", strength: "", security: "", buttons: this.getButtons("123")}];
        // return this.props.unconfiguredEsps.map((esp) =>
        //     ({  ssid: esp.ssid,
        //         mode: "",
        //         channel: "",
        //         rate: "",
        //         strength: "",
        //         security: ""}));
    };
    columns = [
        {
            key: 'ssid',
            name: 'SSID'
        },
        {
            key: "hwid",
            name: "Hardware-ID"
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
        },
        {
            key: "buttons",
            name: ""
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

                <FlashModal isModalOpen={this.state.isModalFlashOpen}
                            closeModal={this.closeModalFlash}
                            firmwares={this.props.firmwares}
                            hardwareId={this.state.selectedHardwareId}/>
                <WifiModal isModalOpen={this.state.isModalWifiOpen}
                           closeModal={this.closeModalWifi}
                           hardwareId={this.state.selectedHardwareId}/>
            </div>
        );
    }
}