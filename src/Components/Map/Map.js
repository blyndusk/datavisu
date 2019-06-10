
import React, { Component } from 'react';
import MapFilters from './MapFilters/MapFilters';
import MapLegend from './MapLegend/MapLegend';
import MapPop from './MapPop/MapPop';
import MapSVG from './MapSVG/MapSVG';
import axios from 'axios';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // API
            baseUrl: 'http://localhost:8000/api/',
            type: [
                'people',
                'prices'
            ],
            params: {
                field: 'idprice.idcategory.category',
                country: 'idcountry.code',
                peopleCountry: 'idpeople.idcountry.code'
            },
            // Codes
            countryCode: '',
            fieldCode: '',
            lengthCode: 0,
            lengthCountryCode: 0,
            // call
            apiCall: '',
            calls: 0,
            pricesPerCountries: {}
        }
    }
    componentDidMount = () => {
        this.handleCountryClick()
        this.apiFieldsCall()
    }
    // set new field code ( PHYSICS, PEACE, ..)
    setFieldFilter = (e) => {
        this.setState({fieldCode: e.target.dataset.label}, () =>  this.apiFieldsCall())        
    }
    // new api call with field param
    apiFieldsCall = () => {
        let params = {}
        if (!this.state.fieldCode.length && this.state.countryCode.length) params[this.state.params.country] = this.state.countryCode
        if (!this.state.fieldCode.length) params = {}
        else {
            params[this.state.params.country] = this.state.countryCode
            params[this.state.params.field] = this.state.fieldCode
        }
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        .then(res => this.setState({
            data: res.data["hydra:member"],
            apiCall: res.request.responseURL,
            lengthCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }, this.parseCountries(res)))
        .catch(err => console.log(err))
    }
    // set an object with amount of prices per country
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
    // colorize countries
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
    // update call with country code
    handleCountryClick = () => {
        [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => {
            this.setState({countryCode: g.id}, () => this.apiCountriesCall())
        }));
    }
    // new call with country param (FR, US, GB, ...)
    apiCountriesCall = () => {
        let params = {}
        let type = 0
        if (!this.state.fieldCode.length) {
            params[this.state.params.country] = this.state.countryCode;
            type = 0
        }
        else {
            console.log('trogger')
            params[this.state.params.country] = this.state.countryCode
            params[this.state.params.field] = this.state.fieldCode
            type = 0
        }
        axios.get(this.state.baseUrl + this.state.type[type], { params })
        .then(res => this.setState({
            data: res.data["hydra:member"],
            apiCall: res.request.responseURL,
            lengthCountryCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }, console.log(res.data["hydra:member"])))
        .catch(err => console.log(err))
    }
    render() {
        return <section className="Map">   
        <ul className="infos" style={window.location.hash === "#dev" ? {display: "block"} : {display: "none"}}>
            <li>Field : <span>{this.state.fieldCode}</span></li>
            <li>Country : <span>{this.state.countryCode}</span></li>
            <li>API call : <a href={this.state.apiCall}>{this.state.apiCall}</a></li>
            <li>calls : <span>{this.state.calls}</span></li>
            <li>{this.state.lengthCountryCode} people in <span>{this.state.fieldCode}</span> in <span>{this.state.countryCode}</span></li>
            <li>{this.state.lengthCode} people in <span>{this.state.fieldCode}</span></li>
        </ul>
            <MapFilters
                setFieldFilter={this.setFieldFilter}
            />
            <MapLegend/> 
            {this.state.data.length ? <MapPop 
                country={this.state.countryCode}  
                data={this.state.data}  
            /> : null}
            <MapSVG/>
            
        </section>
    }
}

export default Map;
