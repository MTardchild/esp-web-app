import React from 'react';

export class Navigation extends React.Component {
    render() {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Configuration</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Rules</a>
                </li>
            </ul>
        );
    }
}