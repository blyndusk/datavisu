import React, { Component } from 'react';

class FilterFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    renderField = (bool) => bool ? <div className="filter">
        <label><input type="checkbox" name="field" value="1" onChange={(e) =>this.props.setFields(e, 0)}/>Field 1</label>
        <label><input type="checkbox" name="field" value="2" onChange={(e) =>this.props.setFields(e, 0)}/>Field 2</label>
        <label><input type="checkbox" name="field" value="3" onChange={(e) =>this.props.setFields(e, 0)}/>Field 3</label>
        <label><input type="checkbox" name="field" value="4" onChange={(e) =>this.props.setFields(e, 0)}/>Field 4</label>
        <label><input type="checkbox" name="field" value="5" onChange={(e) =>this.props.setFields(e, 0)}/>Field 5</label>
        <label><input type="checkbox" name="field" value="6" onChange={(e) =>this.props.setFields(e, 0)}/>Field 6</label>
    </div> : null;
    resetFields = (e) => {
        this.setState({display : e.target.checked});
        this.props.setFields(e, 1)
    }
    render() {
        return <div className="filterBox">
            <div className="filterType">
                <h3>Fields:</h3>
                <input 
                    type="checkbox"
                    onChange={this.resetFields}    
                />
            </div>
            {this.renderField(this.state.display)}
        </div>
    }
}

export default FilterFields;
