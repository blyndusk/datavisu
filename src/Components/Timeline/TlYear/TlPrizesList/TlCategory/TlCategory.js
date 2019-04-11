import React, { Component } from 'react';

class TlCategory extends Component {
    render() {
        return (
            <g className="category" data-id={this.props.id}>
                {this.props.content}
            </g>
        );
    }
}

export default TlCategory;