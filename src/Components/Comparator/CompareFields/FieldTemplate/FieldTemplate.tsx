
import React, { Component } from 'react';

interface P {
  country: {
    fields: any;
  };
  order: number;
}

export default class FieldTemplate extends React.Component<P> {
    render() {
        // inc begin at -25
        let inc = -25;
        // max height begins to 0
        let maxHeight = 0;
        return <div className='FieldTemplate Comparator__template'>
          <svg className='FieldTemplateSVG'>
          {Object.keys(this.props.country.fields).map((key: string) => {
            // update max height
            if (maxHeight < this.props.country.fields[key]) maxHeight = this.props.country.fields[key];
            // set fixed height for all svg
            Array.from(document.querySelectorAll('.FieldTemplate')).map(svg => svg.querySelector('svg')!.style.height = `248px`);
            inc += 50;
            return <g key={key}>
              <text
                x={inc}
                y={this.props.order ?
                  this.props.country.fields[key] * 3 + 24 :
                  248 - (this.props.country.fields[key] * 3 + 15)}
              >
                {this.props.country.fields[key]}
              </text>
              <line
                x1={inc}
                x2={inc}
                y1={this.props.order ? 0 : 248}
                y2={this.props.order ?
                  this.props.country.fields[key] * 3 :
                  248 - (this.props.country.fields[key] * 3)}
              />
            </g>;
          })}
          </svg>
        </div>;
    }
}
