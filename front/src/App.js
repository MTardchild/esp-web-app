import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './App.css';
import 'bootstrap-colorpicker';
import {Navigation} from './components/navigation.jsx';
import {Dashboard} from './components/dashboard/dashboard.jsx';
import {Config} from "./components/config/config";
import {Rules} from "./components/rules/rules";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            esps: [],
            unconfiguredEsps: [],
            firmwares: [],
            doors: [],
            windows: [],
            locations: [],
            rooms: [],
            view: 0
        };

        this.getAjax("esps");
        this.getAjax("unconfiguredEsps");
        this.getAjax("firmwares");
        this.getAjax("doors");
        this.getAjax("windows");
        this.getAjax("locations");
        this.getAjax("rooms");
        this.onNavClicked = this.onNavClicked.bind(this);
    }
    getAjax(datasetName) {
        const self = this;
        fetch("?route=ajax&action=get" + App.upperCaseFirstChar(datasetName))
            .then(function (response) {
                response.json().then(function(data) {
                    // workaround to use string as key
                    let set = [];
                    set[datasetName] = data;
                    self.setState(set);
                });
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
    static upperCaseFirstChar(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    onNavClicked(id, event) {
        event.preventDefault();
        this.setState({view: id});
    }
    getActiveView() {
        let activeView;
        switch (this.state.view) {
            case 0:
                activeView = <Dashboard
                    esps={this.state.esps}/>;
                break;
            case 1:
                activeView = <Config
                    esps={this.state.esps}
                    unconfiguredEsps={this.state.unconfiguredEsps}
                    firmwares={this.state.firmwares}
                    doors={this.state.doors}
                    windows={this.state.windows}
                    locations={this.state.locations}
                    rooms={this.state.rooms}/>;
                break;
            case 2:
                activeView = <Rules/>;
                break;
            default:
                break;
        }

        return activeView;
    }
  render() {
    return (
      <div className="App">
          <Navigation onNavClicked={this.onNavClicked}/>
          {this.getActiveView()}
      </div>
    );
  }
}

export default App;
