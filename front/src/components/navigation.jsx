import React from 'react';

export class Navigation extends React.Component {
    render() {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" href="#"
                       onClick={(e) => this.props.onNavClicked(0, e)}>
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"
                       onClick={(e) => this.props.onNavClicked(1, e)}>
                        Configuration
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"
                       onClick={(e) => this.props.onNavClicked(2, e)}>
                        Rules
                    </a>
                </li>
            </ul>
        );
    }
}