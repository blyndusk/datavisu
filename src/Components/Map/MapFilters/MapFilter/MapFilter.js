
import React, { Component } from 'react';

class MapFilter extends Component {
   
    componentDidMount = () => {
        
    }
    addFilter = (e) => console.log(e.target.dataset.label);
    
    
    render() {
        return <li 
            onClick={this.addFilter}
            data-label={this.props.label}
        >{this.props.name}</li>
    }
}

export default MapFilter;
