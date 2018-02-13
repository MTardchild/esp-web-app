import React from 'react';
import { AlphaPicker, HuePicker } from 'react-color';

export class LedStrip extends React.Component {
    constructor(props) {
        super(props);
    }
    static convertToByte(color) {
        return color/16;
    }
    render() {
        return (
            <div>
                <HuePicker width="100%" color={{
                    r: LedStrip.convertToByte(this.props.red),
                    g: LedStrip.convertToByte(this.props.green),
                    b: LedStrip.convertToByte(this.props.blue)}}
                />
                <AlphaPicker width="100%" color={{a: this.props.warmWhite}}/>
                <p>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                {/*<Knob value={this.props.red} onChange={this.handleChange}/>*/}
                            </div>
                            <div className="col-sm">
                                {/*<Knob value={this.props.green} onChange={this.handleChange}/>*/}
                            </div>
                            <div className="col-sm">
                                {/*<Knob value={this.props.blue} onChange={this.handleChange}/>*/}
                            </div>
                            <div className="col-sm">
                                {/*<Knob value={this.props.warmWhite} onChange={this.handleChange}/>*/}
                            </div>
                        </div>
                    </div>
                </p>
                <hr />
            </div>
        );
    }
}