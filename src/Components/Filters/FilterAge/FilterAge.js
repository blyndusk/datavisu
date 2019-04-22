import React, { Component } from 'react';

class FilterAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderAge = (bool) => bool ? <div className="filter">
        <input 
        type="number"
        min="20"
        max="72"
        placeholder="30"
        onChange={(e) => this.props.setAge(e, 0)}
    />
    </div> : null 
    resetAge = (e) => {
        this.setState({display : e.target.checked})
        this.props.setAge(e, 1)
    }
    render() {
        return <div className="filterBox">
            <div className="filterType">
                <h3>Age:</h3>
                <input 
                    type="checkbox"
                    onChange={this.resetAge}
                />
            </div>
            {this.renderAge(this.state.display)}
        </div>
    }
}

export default FilterAge;
