
import React, { Component } from 'react';
import MapFilter from './MapFilter/MapFilter'
import axios from 'axios'

interface MapFiltersProps {
    setFieldFilter: any
}

interface MapFiltersState {
    data: [{
            category: string
        }
    ],
    baseUrl: 'http://localhost:8000/api/',
    // 2 types of API filters
    type: [
        'people',
        'prices', 
        'categories'
    ],
}
class MapFilters extends React.Component<MapFiltersProps, MapFiltersState> {
    componentDidMount = () => this.getCategories();
    getCategories = () => {
        axios.get(this.state.baseUrl + this.state.type[2])
            .then(res => {
                const response = res.data["hydra:member"];
                response.unshift({category: 'all'})
                this.setState({data: res.data["hydra:member"]})
            })
            .catch(err => console.log(err))
    }
    render() {
        return <ul className="MapFilters">
            <h3 className="MapFilters__title">Prizes</h3> 
            {this.state.data.map(field => <MapFilter
                classState={field.category === 'all' ? 'MapFilter--active' : ''}
                getField={this.props.setFieldFilter}
                key={field.category}
                name={field.category}
                label={field.category === 'all' ? '' : field.category}
            />)}
        </ul>
    }
}

export default MapFilters;
