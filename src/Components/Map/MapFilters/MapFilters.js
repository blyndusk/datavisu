
import React, { Component } from 'react';
import MapFilter from './MapFilter/MapFilter'
import axios from 'axios'

class MapFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            baseUrl: 'http://f4fc5758.ngrok.io/api/',
            // 2 types of API filters
            type: [
                'people',
                'prices', 
                'categories'
            ],
        }
    }
    componentDidMount = () => {
        this.getCategories()
    }
    getCategories = () => {
        axios.get(this.state.baseUrl + this.state.type[2])
            .then(res => {
                const response = res.data["hydra:member"];
                response.unshift({category: 'all'})
                this.setState({data: res.data["hydra:member"]}, () => console.log(this.state.data))
            })
            .catch(err => console.log(err))
    }
    
    
    render() {
        return <ul className="MapFilters">
            <h4 className="MapFilters__title">Prizes</h4> 
            {this.state.data.map(field => <MapFilter
                getField={this.props.setFieldFilter}
                key={field.category}
                name={field.category}
                label={field.category === 'all' ? '' : field.category}
            />)}
         </ul>
    }
}

export default MapFilters;
