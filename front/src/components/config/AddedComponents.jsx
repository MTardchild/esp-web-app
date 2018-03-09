import React from 'react';
import {AddedDhts} from "./AddedDhts";
import {AddedRelays} from "./AddedRelays";
import {AddedLedStrips} from "./AddedLedStrips";

export class AddedComponents extends React.Component {
    render() {
        return (<div className="row margin-md">
            <div className="col"/>
            <AddedLedStrips remove={this.props.remove} components={this.props.components}/>
            <AddedDhts remove={this.props.remove} components={this.props.components}/>
            <AddedRelays remove={this.props.remove} components={this.props.components}/>
            <div className="col"/>
        </div>);
    }
}