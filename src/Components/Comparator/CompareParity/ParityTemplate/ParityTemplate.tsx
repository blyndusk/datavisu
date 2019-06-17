
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
            // set percentage it terms of props
            const percentage = this.props.country.parity.f.percent / 100
            this.setPercentage(this.state.rayon, percentage);
            this.setRotation(percentage)
        }
    }
    // set rotation of the svg to be aligned horizontally
    setRotation = (percentage) => this.setState({svgStyle: {transform: `rotate(${- 360 * percentage / 2}deg)`}})
    // set percentage of the svg
    setPercentage = (rayon, percentage) => {
        const perimeter = Math.PI * 2 * rayon;
        this.setState({pathStyle: {strokeDasharray: `${perimeter * percentage}, ${perimeter}`},})
    }
    render() {
        const country = this.props.country
        return <div className="ParityTemplate Comparator__template">
            <span className="ParityTemplate__percent">{country.parity.m.percent}%<br></br>Men</span>
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
            <span className="ParityTemplate__percent">{country.parity.f.percent}%<br></br>Women</span>
        </div>
    }
}

export default ParityTemplate;
