
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
        return <div className="ParityTemplate Comparator__template">
            <svg xmlns="http://www.w3.org/2000/svg" width="182" height="182" style={this.state.svgStyle}>
                <circle className="men" cy="91" cx="91" r={this.state.rayon}></circle>
                <circle style={this.state.pathStyle} className="women" cy="91" cx="91" r={this.state.rayon}></circle>
            </svg>
            <div className="ParityTemplate__items">
                <div className="ParityTemplate__item">
                    <span className="ParityTemplate__number">{country.parity.m.amount}</span>
                    <i className="ParityTemplate__icon fas fa-mars"></i>
                </div>
                <div className="ParityTemplate__item">
                    <i className="ParityTemplate__icon fas fa-venus"></i>
                    <span className="ParityTemplate__number">{country.parity.f.amount}</span>
                </div>
            </div>
        </div>
    }
}

export default ParityTemplate;
