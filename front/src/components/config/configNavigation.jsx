import React from 'react';

export class ConfigNavigation extends React.Component {
    render() {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(0, e)}>Configured ESPs</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(1, e)}>Unconfigured ESPs</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(2, e)}>Firmwares</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(3, e)}>Locations</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(4, e)}>Rooms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(5, e)}>Doors</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.onNavClicked(6, e)}>Windows</a>
                </li>
            </ul>
        );
    }
}