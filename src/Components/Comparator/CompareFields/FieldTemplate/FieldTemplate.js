
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
        return <div className="FieldTemplate Comparator__template">
          <svg className="FieldTemplateSVG">
          { Object.keys(this.props.country.fields).map(key =>  {
            if (maxHeight < this.props.country.fields[key] ) {
              maxHeight = this.props.country.fields[key] 
            }
            [...document.querySelectorAll('.FieldTemplate')].map(svg => svg.querySelector('svg').style.height = `248px`)
            inc += 50
            return <g key={key}>
              <text  x={inc} y={this.props.order ? this.props.country.fields[key] * 3  + 24 : 248  - (this.props.country.fields[key] * 3 + 15)} >{this.props.country.fields[key]}</text>
              <line x1={inc} x2={inc} y1={this.props.order ? 0 : 248} y2={this.props.order ? this.props.country.fields[key] * 3 : 248 - (this.props.country.fields[key] * 3)}></line>
            </g>
          })}
          </svg>
        </div>
    }
}

export default FieldTemplate;
