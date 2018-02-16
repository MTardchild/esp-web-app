import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './App.css';
import 'bootstrap-colorpicker';
import {Navigation} from './components/navigation.jsx';
import {Dashboard} from './components/dashboard.jsx';
import {Configuration} from "./components/configuration";
import {Rules} from "./components/rules";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 0
        };

        this.onNavClicked = this.onNavClicked.bind(this)
    }
    onNavClicked(id, event) {
        event.preventDefault();
        this.setState({view: id});
    }
    getActiveView() {
        let activeView;
        switch (this.state.view) {
            case 0:
                activeView = <Dashboard/>;
                break;
            case 1:
                activeView = <Configuration/>;
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
