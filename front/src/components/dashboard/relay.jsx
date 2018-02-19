import React from 'react';
import { withAlert } from 'react-alert'

export class Relay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: this.props.state
        };
    }
    toggle = () => {
        const self = this;
        this.props.alert.show('Toggling ' + this.props.name + " ...");
        fetch("?route=ajax&action=toggleRelay&id=" + this.props.id)
            .then(function (response) {
                response.then(function(data) {
                    self.props.alert.success('Toggled ' + self.props.name);
                });
            })
            .catch(function (error) {
                self.setState({state: !self.state.state});
                self.props.alert.error('Unable to toggle ' + self.props.name);
            });
        this.setState({state: !this.state.state});
    };
    render() {
        return (
            <div>
                <span>{this.props.name}</span>
                <label className="switch" style={{float: "right"}}>
                    <input type="checkbox" checked={this.state.state} onChange={this.toggle} />
                    <span className="slider round"/>
                </label>
                <hr />
            </div>
        );
    }
}

export default withAlert(Relay)