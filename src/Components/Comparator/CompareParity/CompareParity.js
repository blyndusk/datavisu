
import React, { Component } from 'react';

class CompareParity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgStyle: {},
            pathStyle: {}
        }
    } 
    componentDidMount = () => {
        this.setPercentage(75, 0.2);
        this.setRotation(0.2)
    }
    setRotation = (percentage) => {
        this.setState({svgStyle: {
            transform: `rotate(${- 360 * percentage / 2}deg)`},
        })
    }
    setPercentage = (rayon, percentage) => {
        const perimeter = Math.PI * 2 * rayon;
        this.setState({pathStyle: {
            strokeDasharray: `${perimeter * percentage}, ${perimeter}`},
        })
    }
    render() {
        return <section className="CompareParity">   
            <h2>CompareParity</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="200" style={this.state.svgStyle}>
                <circle className="men" cy="100" cx="100" r="75"></circle>
                <circle style={this.state.pathStyle} className="women" cy="100" cx="100" r="75"></circle>
            </svg>
        </section>
    }
}

export default CompareParity;
