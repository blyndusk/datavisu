import React, { Component } from 'react';

class FilterAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            value: null
        }
    }
    renderAge = (bool) => bool ? <input 
        type="number"
        min="20"
        max="72"
        placeholder="30"
        onChange={(e) => this.props.setAge(e)}
    /> : null 
    onChangeDisplay = (e) => {
        this.setState({
            display : e.target.checked,
            value: null
        })
    }
    render() {
        return <div className="FilterAge">
            <h2>FilterAge</h2>
            <input 
                type="checkbox"
                onChange={(e) => this.onChangeDisplay(e)}    
            />
            {this.renderAge(this.state.display)}
        </div>
    }
}

export default FilterAge;
