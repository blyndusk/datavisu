
import React, { Component } from 'react';

class ParityTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
           universities: {},
           sortedUniversities: []
        }
    } 
    componentDidUpdate = (prevProps) => {
        // if (this.props.country !== prevProps.country ) {
        //     this.getuniversities(this.props.country)
        // }
    }
    

    render() {
        let inc = -50;
        let maxHeight = 0;
        return <div className="UniversitiesTemplate">
          <svg className="UniversitiesTemplateSvg">
              {
                  this.props.country.sortedUniversities.map(university => {

                    if (maxHeight < university[1] ) {
                        maxHeight = university[1]
                      }
                      [...document.querySelectorAll('.UniversitiesTemplate')].map(svg => svg.querySelector('svg').style.height = `${maxHeight * 4 +  20}px`)
                      inc += 100
            return <g key={university[0]}>
              <text  x={inc - 8} y={this.props.order ? university[1] * 4  + 15 : 160  - (university[1] * 4 + 15)} >{university[0]} - {university[1]}</text>
              <line x1={inc} x2={inc} y1={this.props.order ? 0 : 160} y2={this.props.order ? university[1] * 4 : 160 - (university[1] * 4)}></line>
            </g>
                  })
              }
          
          </svg>
        </div>
    }
}

export default ParityTemplate;

