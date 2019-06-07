
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
            field: 'all',
            apiFieldCall: '',
            apiCountryCall: '',
            calls: 0,
            pricesPerCountries: {}
        }
    }
    componentDidMount = () => {
        this.getCountry()
        this.parseCountries('people')
    }
    parseCountries = (url) => {
        console.log(url)
        axios.get(`http://localhost:8000/api/${url}`)
        .then(res => {
            let codes = {}
            res.data["hydra:member"].map(code => {
                code = code.idcountry.code;
                if (code in codes) codes[code] = codes[code] + 1
                else codes[code] = 1
                return null;
            })
            console.log(codes)
            this.setState({ pricesPerCountries: codes}, () => this.setCountryColors())
        })
        .catch(err => console.log(err))
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
    getField = (e) => {
        this.setState({field: e.target.dataset.label}, () =>  this.parseCountries(this.state.field === 'all' ? `people` : `people?idprice.idcategory.category=${this.state.field}`))

        
    }
    getCountry = () => {
        [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => {
            this.setState({country: g.id}, () => this.getData("country", this.state.country, "apiCountryCall"))
        }));
    }
    getData = (key, param, apicall) => {
        console.log(this.state.field)
        axios.get(this.state.field === 'all' ? `http://localhost:8000/api/prices?idpeople.idcountry.code=${this.state.country}` : `http://localhost:8000/api/people?idcountry.code=${this.state.country}&idprice.idcategory.category=${this.state.field}`, {
            
            // params: {
            //     ...params
            // }
        })
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
