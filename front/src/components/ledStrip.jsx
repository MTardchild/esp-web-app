import React from 'react';
import { ChromePicker } from 'react-color';

export class LedStrip extends React.Component {
    static convertToByte(color) {
        return color/16;
    }
    handleChangeComplete = (color, event) => {
        console.log(color.hsv);
        console.log(color.rgb);
    };
    render() {
        return (
            <div>
                <ChromePicker color={{r: LedStrip.convertToByte(this.props.red),
                    g: LedStrip.convertToByte(this.props.green),
                    b: LedStrip.convertToByte(this.props.blue),
                    a: this.props.warmWhite}}
                    onChange={this.handleChangeComplete}/>
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