
import React, { Component } from 'react';

class MapFilter extends Component {
   
    componentDidMount = () => {
        
    }
    addFilter = (e) => e.target.dataset.label;
    
    
    render() {
        return <li 
            onClick={(e) => this.props.getField(e)}
            data-label={this.props.label}
        >{this.props.name}</li>
    }
}

export default MapFilter;
