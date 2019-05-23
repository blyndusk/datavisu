
import React, { Component } from 'react';
import MapFilters from './MapFilters/MapFilters';
import MapLegend from './MapLegend/MapLegend';
import MapPop from './MapPop/MapPop';
import MapSVG from './MapSVG/MapSVG';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            field: '',
            apiFieldCall: '',
            apiCountryCall: '',
            calls: 0
        }
    }
    componentDidMount = () => {
        this.setCountryColors();
        this.getCountry()
    }
    setCountryColors = () => {
        [...document.querySelectorAll('.Map path')].map(path => {
            const color = Math.floor(Math.random() * (66 - 24)) + 24;
            return path.style.fill = `hsl(213, ${color}%, ${color}%)`
        });
        
    }
    getField = (e) => {
        this.setState({field: e.target.dataset.label}, () => this.getData("field", this.state.field, "apiFieldCall"))
        
    }
    getCountry = () => {
        [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => {
            this.setState({country: g.id}, () => this.getData("country", this.state.country, "apiCountryCall"))
        }));
    }
    getData = (key, param, apicall) => {
        const params = {};
        params[key] = param;
        axios.get('http://localhost:8000/api', {
            params: {
                ...params
            }
        })
        .then(res => {
            const newState = {};
            newState[apicall] = res.request.responseURL;
            this.setState({
                ...newState,
                calls: this.state.calls + 1    
            })
        })
        .catch(err => console.log(err))
    }
    
    
    render() {
        return <section className="Map">   
        <ul className="infos">
            <li>Field : <span>{this.state.field}</span></li>
            <li>Country : <span>{this.state.country}</span></li>
            <li>API fields call : <a href={this.state.apiFieldCall}>{this.state.apiFieldCall}</a></li>
            <li>API country call : <a href={this.state.apiCountryCall}>{this.state.apiCountryCall}</a></li>
            <li>calls : <span>{this.state.calls}</span></li>
        </ul>
            <MapFilters
                getField={this.getField}
            />
            <MapLegend/> 
            <MapPop 
                country={this.state.country}    
            />
            <MapSVG/>
            
        </section>
    }
}

export default Map;
