import React from 'react';

export class AddedRelays extends React.Component {
    render() {
        let relays = this.props.components.filter(component => component.typeId === 2);

        if (relays.length !== 0)
            return (<div className="col-md-auto">
                <div className="row">
                    <div className="col">
                        <h2>{relays.length}</h2>
                        <img src="public/img/switch.png" width={50} alt=""
                             className="img-thumbnail margin-x-sm"
                             onClick={() => this.props.remove(2)}/>
                    </div>
                </div>
            </div>);
        else
            return null;
    }
}