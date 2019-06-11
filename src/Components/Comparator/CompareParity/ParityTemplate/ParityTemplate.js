
import React, { Component } from 'react';

class ParityTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgStyle: {},
            pathStyle: {},
            rayon: 75
        }
    } 
    componentDidUpdate = (prevProps) => {
        if (this.props.country !== prevProps.country ) {
            const percentage = this.props.country.parity.f.percent / 100
            this.setPercentage(this.state.rayon, percentage);
            this.setRotation(percentage)
        }
    }
    setRotation = (percentage) => this.setState({svgStyle: {
        transform: `rotate(${- 360 * percentage / 2}deg)`},
    })
    setPercentage = (rayon, percentage) => {
        const perimeter = Math.PI * 2 * rayon;
        this.setState({pathStyle: {
            strokeDasharray: `${perimeter * percentage}, ${perimeter}`},
        })
    }
    render() {
        const country = this.props.country
        return <div className="ParityTemplate">
           <span>{country.parity.m.amount} <i className="fas fa-mars"></i> | <i className="fas fa-venus"></i> {country.parity.f.amount}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="200" style={this.state.svgStyle}>
                <circle className="men" cy="100" cx="100" r={this.state.rayon}></circle>
                <circle style={this.state.pathStyle} className="women" cy="100" cx="100" r={this.state.rayon}></circle>
            </svg>
        </div>
    }
}

export default ParityTemplate;
