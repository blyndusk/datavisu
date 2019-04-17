import React, { Component } from 'react';
import FilterAge from './FilterAge/FilterAge'
import FilterFields from './FilterFields/FilterFields'
import FilterGender from './FilterGender/FilterGender'

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
            <FilterFields/>
            <FilterGender/>
        </div>;
    }
}

export default Filters;
