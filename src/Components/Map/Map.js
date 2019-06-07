
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
        this.getCountry()

       
        axios.get('http://localhost:8000/api/people', {
            // params: {
            //     ...params
            // }
        })
        .then(res => {
            const prices = res.data["hydra:member"]
            let codes = {}
            for (let i = 0; i < prices.length; i++) {
                const code = prices[i].idcountry.code;
                if (code in codes) {
                    console.log(codes[code])
                    codes[code] = parseInt(codes[code]) + 1
                    // if (code) console.log('many')
                }
                else codes[code] = 1
                
                
            }
            console.log(codes)
            let test = 0;
            for (const key in codes) {
                test = test + codes[key]
            }
            console.log(test)

            this.setCountryColors(codes);
        })
        .catch(err => console.log(err))
    }
    setCountryColors = (codes) => {
        [...document.querySelectorAll('.Map g')].map(g => {
            // const color = Math.floor(Math.random() * (66 - 24)) + 24;
            // return path.style.fill = `hsl(213, ${color}%, ${color}%)`
            for (const key in codes) {
                if (codes.hasOwnProperty(key)) {
                    const element = codes[key];
                    if (g.id.toUpperCase() == key ) {
                        for (let k = 0; k < g.querySelectorAll('path').length; k++) {
                            const percent = (element / 500) * 100 + 25;
                            console.log(percent)
                            const path = g.querySelectorAll('path')[k];
                            path.style.fill = `hsl(213, ${percent}%, ${percent}%`
                        }
                         // const color = Math.floor(Math.random() * (66 - 24)) + 24;
            // return path.style.fill = `hsl(213, ${color}%, ${color}%)
                    }
                }
            }

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
        axios.get('http://localhost:8000/api/prices?idpeople.idcountry.code=FR', {
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
            }, console.log(res))
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
