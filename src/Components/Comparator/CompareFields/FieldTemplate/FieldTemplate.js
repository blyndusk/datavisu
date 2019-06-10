
import React, { Component } from 'react';

class FieldTemplate extends Component {
    componentDidUpdate = (prevProps) => {
        if (this.props.country !== prevProps.country ) {
            console.log('done')
        }
    }
    render() {
        let inc = -25;
        return <div className="FieldTemplate">
          <svg>
          { Object.keys(this.props.country.fields).map(key =>  {
            inc += 50
            return <line key={key} x1={inc} x2={inc}y1="0" y2={this.props.country.fields[key] * 10}></line>
          })}
          </svg>
        </div>
    }
}

export default FieldTemplate;
