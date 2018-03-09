import React from 'react';

export class AddedDhts extends React.Component {
    render() {
        let dhts = this.props.components.filter(component => component.typeId === 1);

        if (dhts.length !== 0)
            return (<div className="col-md-auto">
                <div className="row">
                    <div className="col">
                        <h2>{dhts.length}</h2>
                        <img src="public/img/temperature.png" width={50} alt=""
                             className="img-thumbnail margin-x-sm"
                             onClick={() => this.props.remove(1)}/>
                    </div>
                </div>
            </div>);
        else
            return null;
    }
}