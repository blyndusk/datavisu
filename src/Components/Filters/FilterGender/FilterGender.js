import React, { Component } from 'react';

class FilterGender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderField = (bool) => bool ? <div>
        <label>
            <input type="checkbox" name="gd1" value="gd1"/>Man
            <input type="checkbox" name="gd2" value="gd2"/>Woman
        </label>
    </div> : null
    render() {
        return <div className="FilterGender">
            <h2>FilterGender</h2>
            <input 
                type="checkbox"
                onChange={(e) => this.setState({display : e.target.checked})}    
            />
            {this.renderField(this.state.display)}
        </div>
    }
}

export default FilterGender;
