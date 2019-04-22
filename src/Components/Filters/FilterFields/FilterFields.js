import React, { Component } from 'react';

class FilterFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            fields: []
        }
    }
    renderField = (bool) => bool ? <div>
        <label>
            <input type="checkbox" name="fl1" value="1" onChange={(e) =>this.props.setFields(e)}/>Field 1
            <input type="checkbox" name="fl2" value="2" onChange={(e) =>this.props.setFields(e)}/>Field 2
            <input type="checkbox" name="fl3" value="3" onChange={(e) =>this.props.setFields(e)}/>Field 3
            <input type="checkbox" name="fl4" value="4" onChange={(e) =>this.props.setFields(e)}/>Field 4
            <input type="checkbox" name="fl5" value="5" onChange={(e) =>this.props.setFields(e)}/>Field 5
            <input type="checkbox" name="fl6" value="6" onChange={(e) =>this.props.setFields(e)}/>Field 6
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
