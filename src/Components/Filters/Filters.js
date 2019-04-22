import React, { Component } from 'react';
import FilterAge from './FilterAge/FilterAge'
import FilterFields from './FilterFields/FilterFields'
import FilterGender from './FilterGender/FilterGender'

class Filters extends Component {
    render() {
        return <div className="Filters" >
            <h2>filters</h2>
            <FilterAge
                setAge={this.props.setAge}
            />
            <FilterFields
                setFields={this.props.setFields}
            />
            <FilterGender
                setGender={this.props.setGender}
                />
        </div>;
    }
}

export default Filters;
