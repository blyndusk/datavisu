
import React, { Component } from 'react';

interface P {
    country: any;
    order: number;
}

interface S {
    ageAverage: {
        m: number;
        f: number;
    };
}

export default class AgeTemplate extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            ageAverage: {
                f: 0,
                m: 0,
            },
        };
    }
    render() {
        // inc begin at -25
        let inc = -25;
        // max height begins to 0
        let maxHeight = 0;
        return <div className='AgeTemplate Comparator__template'>
            <svg>
                {Object.keys(this.props.country).map(key => {
                    // for every gender ( m, f )
                    // set age if the age is a number
                    const age = !isNaN(this.props.country[key]) ? this.props.country[key] : 0;
                    // update max height
                    if (maxHeight < age) maxHeight = age;
                    // for every svg in the template, set height to max height
                    Array.from(document.querySelectorAll('.AgeTemplateSvg')).map(svg => svg.querySelector('svg')!.style.height = `${maxHeight * 2 +  50}px`);
                    // increment each age
                    inc += 50;
                    // generate svg with line & text
                    return <g key={key} x='0'>
                        <text
                            x={inc - 8}
                            y={this.props.order ? age * 2  + 25 : 174  - (age * 2 + 15)}
                        >
                            {age}
                        </text>
                        <line
                            x1={inc}
                            y1={this.props.order ? 0 : 174}
                            x2={inc}
                            y2={this.props.order ? age * 2 : 174 - (age * 2)}
                        />
                    </g>;
                    })
                }
            </svg>
        </div>;
    }
}
