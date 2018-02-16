import React from 'react';

export class Dht extends React.Component {
    render() {
        return (
            <div>
                <span>Temperature: {this.props.temperature}</span><br/>
                <span>Humidity: {this.props.humidity}</span>
                <hr />
            </div>
        );
    }
}