
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
            baseUrl: 'http://localhost:8000/api/',
            type: [
                'people',
                'prices'
            ],
            fieldParam: 'idprice.idcategory.category',
            countryParam: 'idcountry.code',
            peopleCountryParam: 'idpeople.idcountry.code',
            country: '',
            field: '',
            apiFieldCall: '',
            apiCountryCall: '',
            calls: 0,
            pricesPerCountries: {}
        }
    }
    componentDidMount = () => {
        this.getCountry()
        this.setCountriesField()
    }
    getField = (e) => {
        this.setState({field: e.target.dataset.label}, () =>  this.setCountriesField())        
    }
    setCountriesField = () => {
        let params = {}
        if (!this.state.field.length) params = {}
        else params[this.state.fieldParam] = this.state.field
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        .then(res => this.parseCountries(res))
        .catch(err => console.log(err))
    }
    setCountriesData = (apicall) => {
        let params = {}
        let type = 0
        if (!this.state.field.length) {
            params[this.state.peopleCountryParam] = this.state.country
            type = 1
        }
        else {
            params[this.state.countryParam] = this.state.country
            params[this.state.fieldParam] = this.state.field
            type = 0
        }
        axios.get(this.state.baseUrl + this.state.type[type], { params })
        .then(res => {
            const newState = {};
            newState[apicall] = res.request.responseURL;
            this.setState({
                ...newState,
                calls: this.state.calls + 1    
            }, console.log(res.data["hydra:member"]))
        })
        .catch(err => console.log(err))
    }
    parseCountries = (res) => {
        let codes = {}
        res.data["hydra:member"].map(code => {
            code = code.idcountry.code;
            if (code in codes) codes[code] = codes[code] + 1
            else codes[code] = 1
        })
        console.log(codes)
        this.setState({ pricesPerCountries: codes}, () => this.setCountryColors())
    }
    
    setCountryColors = () => {
        const codes = this.state.pricesPerCountries;
        [...document.querySelectorAll('.Map g')].map(g => {
            for (const key in codes) {
                if (g.id.toUpperCase() === key ) [...g.querySelectorAll('path')].map(path => {
                    const percent = (codes[key] / 500) * 100 + 33;
                    return path.style.fill = `hsl(213, ${percent}%, ${percent}%`;
                })
            }
        });
    }
    
    getCountry = () => {
        [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => {
            this.setState({country: g.id}, () => this.setCountriesData("apiCountryCall"))
        }));
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
