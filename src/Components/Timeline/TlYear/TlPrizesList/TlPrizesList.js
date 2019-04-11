import React, { Component } from 'react';

class TlPrizesList extends Component {
    render() {
        return <g className="prizesList" data-id={this.props.id}>
            {this.props.content}
        </g>;
    }
}

export default TlPrizesList;