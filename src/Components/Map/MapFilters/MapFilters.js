
import React, { Component } from 'react';
import MapFilter from './MapFilter/MapFilter'

class MapFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    name: 'all',
                    label: 'all'
                },
                {
                    name: 'physics',
                    label: 'phy'
                },
                {
                    name: 'chemistry',
                    label: 'che'
                },
                {
                    name: 'medecine',
                    label: 'med'
                },
                {
                    name: 'litterature',
                    label: 'lit'
                },
                {
                    name: 'peace',
                    label: 'pea'
                },
                {
                    name: 'economics',
                    label: 'eco'
                }
            ]
        }
    }
    componentDidMount = () => {
        
    }
    
    
    render() {
        return <ul className="MapFilters">    
            {this.state.fields.map(field => <MapFilter
                getField={this.props.getField}
                key={field.name}
                name={field.name}
                label={field.label}
            />)}
         </ul>
    }
}

export default MapFilters;
