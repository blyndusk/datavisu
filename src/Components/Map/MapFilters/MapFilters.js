
import React, { Component } from 'react';
import MapFilter from './MapFilter/MapFilter'

class MapFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    name: 'all',
                    label: ''
                },
                {
                    name: 'physics',
                    label: 'physics'
                },
                {
                    name: 'chemistry',
                    label: 'chemistry'
                },
                {
                    name: 'medicine',
                    label: 'medicine'
                },
                {
                    name: 'literature',
                    label: 'literature'
                },
                {
                    name: 'peace',
                    label: 'peace'
                },
                {
                    name: 'economics',
                    label: 'economics'
                }
            ]
        }
    }
    componentDidMount = () => {
        
    }
    
    
    render() {
        return <ul className="MapFilters">    
            {this.state.fields.map(field => <MapFilter
                getField={this.props.setFieldFilter}
                key={field.name}
                name={field.name}
                label={field.label}
            />)}
         </ul>
    }
}

export default MapFilters;
