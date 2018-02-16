import React from 'react';
import {ConfigurationNavigation} from "./ConfigurationNavigation";

export class Configuration extends React.Component {
    render() {
        return (
            <div>
                <ConfigurationNavigation/>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">123</div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">51dfg</div>
                </div>
            </div>
        );
    }
}