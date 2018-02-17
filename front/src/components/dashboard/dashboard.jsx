import React from "react";
import {Dht} from "./dht";
import {Relay} from "./relay"
import {LedStrip} from "./ledStrip"

export class Dashboard extends React.Component {
    static getComponent(component) {
        let componentHtml;
        switch(component.typeId) {
            case 1: // dht
                componentHtml = <Dht name={component.name} temperature={component.temperature}
                                     humidity={component.humidity} />;
                break;
            case 2: // switch/relay
                componentHtml = <Relay name={component.name} state={component.state} />;
                break;
            case 3: // led strip
                componentHtml = <LedStrip name={component.name} red={component.red} blue={component.blue}
                                          green={component.green} warmWhite={component.warmWhite} />;
                break;
            default:
                break;
        }

        return componentHtml;
    }
    getComponents(esp) {
        if (esp.components !== undefined) {
            return esp.components.map((component) =>
                Dashboard.getComponent(component)
            );
        }
    }
    render() {
        let espCards = this.props.esps.map((esp) =>
            <div className="card">
                <div className="card-body">
                    <span> </span><h5 className="card-title">{esp.name}</h5>
                    <hr />
                    {this.getComponents(esp)}
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        );
        return (
            <div class="card-columns" style={{margin: "10px"}}>{espCards}</div>
        );
    }
}