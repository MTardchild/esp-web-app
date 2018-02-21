import React from "react";

export class ObjectFormatterGrid extends React.Component {
    render() {
        return (
            <div>
                {this.props.value.name}
            </div>
        );
    }
}