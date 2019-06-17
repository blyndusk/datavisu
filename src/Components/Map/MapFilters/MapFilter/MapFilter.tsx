
import React, { Component } from 'react';

class MapFilter extends Component {
    addFilter = (e) => e.target.dataset.label;
    render() {
        return <li 
            className={`MapFilter ${this.props.classState}`}
            onClick={(e) => {
                [...document.querySelectorAll('.MapFilters li')].map(li => li.className = 'MapFilter');
                e.target.className = 'MapFilter MapFilter--active';
                this.props.getField(e)
            }}
            data-label={this.props.label}
        >{this.props.name}</li>
    }
}

export default MapFilter;
