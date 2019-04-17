import React, { Component } from 'react';

class FilterFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderField = (bool) => bool ? <div>
        <label>
            <input type="checkbox" name="fl1" value="fl1"/>Field 1
            <input type="checkbox" name="fl2" value="fl2"/>Field 2
            <input type="checkbox" name="fl3" value="fl3"/>Field 3
            <input type="checkbox" name="fl4" value="fl4"/>Field 4
            <input type="checkbox" name="fl5" value="fl5"/>Field 5
            <input type="checkbox" name="fl6" value="fl6"/>Field 6
        </label>
    </div> : null
    render() {
        return <div className="FilterFields">
            <h2>FilterFields</h2>
            <input 
                type="checkbox"
                onChange={(e) => this.setState({display : e.target.checked})}    
            />
            {this.renderField(this.state.display)}
        </div>
    }
}

export default FilterFields;
