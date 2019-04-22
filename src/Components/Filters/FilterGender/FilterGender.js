import React, { Component } from 'react';

class FilterGender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderField = (bool) => bool ? <div>
        <div>
            <input onChange={(e) => this.props.setGender(e)} type="radio" name="gd1" value="0"/>
            <label>Man</label>
        </div>
        <div>
            <input onChange={(e) => this.props.setGender(e)} type="radio" name="gd2" value="1"/>
            <label>Woman</label>
        </div>
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
