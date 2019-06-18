
import React from 'react';

interface P {
    country: {
        sortedUniversities: any[],
    };
    order: number;
}

export default class UniversityTemplate extends React.Component<P> {
    render() {
          // inc begin at -50
          let inc = -50;
          // max height begins to 0
          let maxHeight = 0;
          return <div className='UniversitiesTemplate Comparator__template'>
            <svg className='UniversitiesTemplateSvg'>
                {this.props.country.sortedUniversities.map(university => {
                    // udpate max height
                    if (maxHeight < university[1]) maxHeight = university[1];
                    // set fixed height to all svgs
                    Array.from(document.querySelectorAll('.UniversitiesTemplate')).map(svg => svg.querySelector('svg')!.style.height = '191px');
                    inc += 100;
                    return <g key={university[0]}>
                        <text
                            x={inc}
                            y={this.props.order ? university[1] * 4 + 25 : 191 - (university[1] * 4 + 15)}
                        >
                            {university[0]}
                        </text>
                        <text
                            x={inc}
                            y={this.props.order ? university[1] * 4 + 45 : 191 - (university[1] * 4 + 35)}
                        >
                            {university[1]}
                        </text>
                        <line
                            x1={inc}
                            x2={inc}
                            y1={this.props.order ? 0 : 191}
                            y2={this.props.order ? university[1] * 4 : 191 - (university[1] * 4)}
                        />
                </g>; })}
            </svg>
        </div>;
    }
}
