import React, { Component } from 'react';
import FilterAge from './FilterAge/FilterAge'

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: {
                display: false
            }

        }
    }
    
    render() {
        return <div className="Filters" >
            <h2>filters</h2>
            <FilterAge/>
        </div>;
    }
}

export default Filters;
