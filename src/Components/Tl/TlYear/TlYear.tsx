import React, { Component } from 'react';

class TlYear extends Component {
    render() {
        return <g 
                className="year" 
                data-id={this.props.id}
                data-year={this.props.year}
            >
            {this.props.content}
        </g>;
    }
}

export default TlYear;