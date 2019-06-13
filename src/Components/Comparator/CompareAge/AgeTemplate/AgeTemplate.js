
import React, { Component } from 'react';

class AgeTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ageAverage: {
                m: 0,
                f: 0
            }
        }
    } 
    // componentDidMount() {
    //     console.log(this.props.country)
    //     // this.getAverageAge(this.props.country.m)
    //     // this.getAverageAge(this.props.country.f)
    // }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if(nextProps.country !== this.props.country){
    //         this.getAverageAge(this.props.country.m)
    //         this.getAverageAge(this.props.country.f)
    //       }
    // }
    // componentDidUpdate = (prevProps) => {
    //     console.log(this.props.country)
    //     // console.log(prevProps.country)
    //     // console.log(this.props.country)
    //     if (this.props.country.m !== prevProps.country.m ) {
    //         console.log('vam')
    //         this.getAverageAge(this.props.country.m)
    //         this.getAverageAge(this.props.country.f)
    //     }
    // }
   
    render() {
            let inc = -25;
            let maxHeight = 0;
            return <div className="AgeTemplate Comparator__template">
                <svg>
                    {Object.keys(this.props.country).map((key, index) => {
                        const age =  !isNaN(this.props.country[key]) ? this.props.country[key] : 0

                        if (maxHeight < age ) maxHeight = age;
                        [...document.querySelectorAll('.AgeTemplateSvg')].map(svg => svg.querySelector('svg').style.height = `${maxHeight * 2 +  50}px`)
                        inc += 50
                        return <g key={key} x="0">
                            <text  x={inc - 8} y={this.props.order ? age * 2  + 25 : 174  - (age * 2 + 15)} >{age}</text>
                            <line x1={inc} x2={inc} y1={this.props.order ? 0 : 174} y2={this.props.order ? age * 2 : 174 - (age * 2)}></line>
                        </g>
                        })
                        
                    }
                
                </svg>
            </div> 
    }
}

export default AgeTemplate;
