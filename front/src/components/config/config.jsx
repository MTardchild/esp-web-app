import React from 'react';
import {ConfigNavigation} from "./configNavigation";
import ConfiguredEsps from "./configured/configuredEsps";
import UnconfiguredEsps from "./unconfigured/unconfiguredEsps";
import Firmwares from "./firmwares/firmwares";
import Windows from "./windows/windows";
import Doors from "./doors/doors";
import Rooms from "./rooms/rooms";
import Locations from "./locations/locations";

export class Config extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 0
        };
    }

    onNavClicked = (id, event) => {
        event.preventDefault();
        this.setState({view: id});
    };

    getActiveView() {
        let activeView;
        switch (this.state.view) {
            case 0:
                activeView = <ConfiguredEsps esps={this.props.esps}
                                             locations={this.props.locations}/>;
                break;
            case 1:
                activeView = <UnconfiguredEsps unconfiguredEsps={this.props.unconfiguredEsps}
                                               firmwares={this.props.firmwares}/>;
                break;
            case 2:
                activeView = <Firmwares firmwares={this.props.firmwares}/>;
                break;
            case 3:
                activeView = <Locations locations={this.props.locations}
                                        rooms={this.props.rooms}
                                        doors={this.props.doors}
                                        windows={this.props.windows}/>;
                break;
            case 4:
                activeView = <Rooms rooms={this.props.rooms}/>;
                break;
            case 5:
                activeView = <Doors doors={this.props.doors} rooms={this.props.rooms}/>;
                break;
            case 6:
                activeView = <Windows windows={this.props.windows} rooms={this.props.rooms}/>;
                break;
            default:
                break;
        }

        return activeView;
    }

    render() {
        return (
            <div>
                <ConfigNavigation onNavClicked={this.onNavClicked}/>
                {this.getActiveView()}
            </div>
        );
    }
}