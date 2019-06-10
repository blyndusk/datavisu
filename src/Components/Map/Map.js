
import React, { Component } from 'react';
import MapFilters from './MapFilters/MapFilters';
import MapLegend from './MapLegend/MapLegend';
import MapPop from './MapPop/MapPop';
import MapSVG from './MapSVG/MapSVG';
import axios from 'axios';
import { config } from 'rxjs';

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
        this.setNewData()
    }
    // api only called to update countries colorization
    setCountriesColorization = () => {
        // no param by default
        let params = {}
        // if a field param is detected, add field param
        if (this.state.fieldCode.length) params[this.state.params.field] = this.state.fieldCode;
        // api call, with custom param (field or no field)
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => this.setState({
            apiCall: res.request.responseURL,
            lengthCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }, () => {
            console.log('1st call', this.state.apiCall)
            // and parse countries with the result
            this.parseCountries(res.data["hydra:member"])
        }))
        .catch(err => console.log(err))
        
    }
    // api only called to update country's data
    setCountryData = () => {
        const conf = {
            field: {
                exist: this.state.fieldCode.length, 
                setParam(that) { params[that.state.params.field] = that.state.fieldCode }
            },
            country: {
                exist: this.state.countryCode.length,
                setParam(that) { params[that.state.params.country] = that.state.countryCode }
            }
        }
        // no param by default
        let params = {}
        // if there is neither field nor country, don't change anything
        if (!conf.field.exist && !conf.country.exist) params = {};
        // if there is a field but no country, add field param
        else if (conf.field.exist && !conf.country.exist) conf.field.setParam(this);
        // if there is a country but no field, add country param
        else if (!conf.field.exist && conf.country.exist) conf.country.setParam(this);
        // if there are both field and country
        else if (conf.field.exist && conf.country.exist) {
            // add both params, field & country
            conf.country.setParam(this)
            conf.field.setParam(this)
        }
        // api call, with no param, or field, or country, or both
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update the given data, and #dev status
        .then(res => this.setState({
            data: res.data["hydra:member"],
            apiCall: res.request.responseURL,
            lengthCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }))
        .catch(err => console.log(err))
    }
    // set new field code ( PHYSICS, PEACE, ..)
    handleFilterFieldClick = (e) => {
        this.setState({fieldCode: e.target.dataset.label}, () => this.setNewData())        
    }
    // new api call with field param
    setNewData = () => {
        this.setCountriesColorization();
        this.setCountryData();
       
        
    }
    // set an object with amount of prices per country
    parseCountries = (data) => {
        let codes = {}
        data.map(code => {
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
                setFieldFilter={this.handleFilterFieldClick}
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
