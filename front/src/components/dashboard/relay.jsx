import React from 'react';

export class Relay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: this.props.state
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({'state': !this.state.state});
    }
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