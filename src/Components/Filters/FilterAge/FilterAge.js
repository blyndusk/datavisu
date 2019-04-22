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
        onChange={(e) => this.props.setAge(e, 0)}
    /> : null 
    resetAge = (e) => {
        this.setState({display : e.target.checked})
        this.props.setAge(e, 1)
    }
    render() {
        return <div className="FilterAge">
            <h2>FilterAge</h2>
            <input 
                type="checkbox"
                onChange={this.resetAge}
            />
            {this.renderAge(this.state.display)}
        </div>
    }
}

export default FilterAge;
