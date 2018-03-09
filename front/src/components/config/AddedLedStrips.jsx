import React from 'react';

export class AddedLedStrips extends React.Component {
    render() {
        let ledStrips = this.props.components.filter(component => component.typeId === 3);

        if (ledStrips.length !== 0)
            return (<div className="col-md-auto">
                <div className="row">
                    <div className="col">
                        <h2>{ledStrips.length}</h2>
                        <img src="public/img/ledStrip.png" width={50} alt=""
                             className="img-thumbnail margin-x-sm"
                             onClick={() => this.props.remove(3)}/>
                    </div>
                </div>
            </div>);
        else
            return null;
    }
}