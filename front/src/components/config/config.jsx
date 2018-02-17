import React from 'react';
import {ConfigNavigation} from "./configNavigation";
import {Firmwares} from "./firmwares";
import {ConfiguredEsps} from "./configuredEsps";
import {UnconfiguredEsps} from "./unconfiguredEsps";
import {Windows} from "./windows";
import {Doors} from "./doors";
import {Rooms} from "./rooms";
import {Locations} from "./locations";

export class Config extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 0
        };

        this.onNavClicked = this.onNavClicked.bind(this);
    }
    onNavClicked(id, event) {
        event.preventDefault();
        this.setState({view: id});
    }
    getActiveView() {
        let activeView;
        switch (this.state.view) {
            case 0:
                activeView = <ConfiguredEsps esps={this.props.esps}/>;
                break;
            case 1:
                activeView = <UnconfiguredEsps unconfiguredEsps={this.props.unconfiguredEsps}/>;
                break;
            case 2:
                activeView = <Firmwares firmwares={this.props.firmwares}/>;
                break;
            case 3:
                activeView = <Locations locations={this.props.locations}/>;
                break;
            case 4:
                activeView = <Rooms rooms={this.props.rooms}/>;
                break;
            case 5:
                activeView = <Doors doors={this.props.doors}/>;
                break;
            case 6:
                activeView = <Windows windows={this.props.windows}/>;
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