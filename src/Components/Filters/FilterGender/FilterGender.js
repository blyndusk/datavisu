import React, { Component } from 'react';

class FilterGender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderGender = (bool) => bool ? <div>
        <div>
            <input onChange={(e) => this.props.setGender(e, 0)} type="radio" name="gender" value="0"/>
            <label>Man</label>
        </div>
        <div>
            <input onChange={(e) => this.props.setGender(e, 0)} type="radio" name="gender" value="1"/>
            <label>Woman</label>
        </div>
    </div> : null
    resetGender = (e) => {
        this.setState({display : e.target.checked});
        this.props.setGender(e, 1);
    }
    render() {
        return <div className="FilterGender">
            <h2>FilterGender</h2>
            <input 
                type="checkbox"
                onChange={this.resetGender}    
            />
            {this.renderGender(this.state.display)}
        </div>
    }
}

export default FilterGender;
