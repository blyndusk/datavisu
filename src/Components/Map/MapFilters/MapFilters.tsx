
import axios from 'axios';
import React from 'react';
import MapFilter from './MapFilter/MapFilter';

interface P {
    setFieldFilter: any;
}

interface S {
    data: [{
            category: string,
        }
    ];
    baseUrl: string;
    // 2 types of API filters
    type: string[];
}

export default class MapFilters extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            baseUrl: 'http://localhost:8000/api/',
            data: [{
                category: '',
            }],
            // 2 types of API filters
            type: [
                'people',
                'prices',
                'categories',
            ],
        };
    }
    componentDidMount = () => this.getCategories();
    getCategories = () => {
        axios.get(this.state.baseUrl + this.state.type[2])
            .then(res => {
                const response = res.data['hydra:member'];
                response.unshift({category: 'all'});
                this.setState({data: res.data['hydra:member']});
            })
            .catch(err => console.error(err));
    }
    render() {
        return <ul className='MapFilters'>
            <h3 className='MapFilters__title'>Prizes</h3>
            {this.state.data.map(field => <MapFilter
                classState={field.category === 'all' ? 'MapFilter--active' : ''}
                getField={this.props.setFieldFilter}
                key={field.category}
                name={field.category}
                label={field.category === 'all' ? '' : field.category}
            />)}
        </ul>;
    }
}
