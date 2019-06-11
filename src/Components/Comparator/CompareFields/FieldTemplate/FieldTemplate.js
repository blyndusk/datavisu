
import React, { Component } from 'react';

class FieldTemplate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        maxHeight: 0
      }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.country !== prevProps.country ) {

        }
        if (this.state.maxHeight !== prevState.maxHeight) {
          // [...document.querySelectorAll('FieldTemplate svg')].map(svg => svg.style.height = `${this.state.maxHeight * 10}px`)
        }
    }
    render() {
        let inc = -25;
        let maxHeight = 0;
        return <div className="FieldTemplate">
          <svg className="fieldTemplateSvg">
          { Object.keys(this.props.country.fields).map(key =>  {
            if (maxHeight < this.props.country.fields[key] ) {
              maxHeight = this.props.country.fields[key] 
            }
            [...document.querySelectorAll('.FieldTemplate')].map(svg => svg.querySelector('svg').style.height = `${maxHeight * 4 +  20}px`)
            inc += 50
            return <g key={key}>
              <text  x={inc - 8} y={this.props.order ? this.props.country.fields[key] * 4  + 15 : 316  - (this.props.country.fields[key] * 4 + 15)} >{this.props.country.fields[key]}</text>
              <line x1={inc} x2={inc} y1={this.props.order ? 0 : 316} y2={this.props.order ? this.props.country.fields[key] * 4 : 316 - (this.props.country.fields[key] * 4)}></line>
            </g>
          })}
          </svg>
        </div>
    }
}

export default FieldTemplate;
