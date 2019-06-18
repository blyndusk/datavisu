
import React, { Component } from 'react';

interface P {
    classState: string,
    getField: any,
    label: string,
    name: string
}

class MapFilter extends React.Component<P> {
    addFilter = (e: any) => e.target.dataset.label;
    render() {
        return <li 
            className={`MapFilter ${this.props.classState}`}
            onClick={(e: any) => {
            Array.from(document.querySelectorAll('.MapFilters li')).map(li => li.className = 'MapFilter');
                e.target.className = 'MapFilter MapFilter--active';
                this.props.getField(e)
            }}
            data-label={this.props.label}
        >{this.props.name}</li>
    }
}

export default MapFilter;
