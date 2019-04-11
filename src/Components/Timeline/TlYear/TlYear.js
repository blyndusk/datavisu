import React, { Component } from 'react';

class TlYear extends Component {
    render() {
        return <g className="year" data-id={this.props.id}>
            {this.props.content}
        </g>;
    }
}

export default TlYear;