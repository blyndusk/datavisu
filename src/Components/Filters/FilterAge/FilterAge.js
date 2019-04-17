import React, { Component } from 'react';

class FilterAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderAge = (bool) => bool ? <input 
        type="number"
        min="20"
        max="72"
        placeholder="30"
        onChange={(e) => console.log(e.target.value)}
    /> : null 
    render() {
        return <div className="FilterAge">
            <h2>FilterAge</h2>
            <input 
                type="checkbox"
                onChange={(e) => this.setState({display : e.target.checked})}    
            />
            {this.renderAge(this.state.display)}
        </div>
    }
}

export default FilterAge;
