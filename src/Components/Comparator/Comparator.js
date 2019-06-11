
import React, { Component } from 'react';

import CompareAge from './CompareAge/CompareAge';
import CompareFields from './CompareFields/CompareFields';
import CompareParity from './CompareParity/CompareParity';
import CompareUniversities from './CompareUniversities/CompareUniversities';
import axios from 'axios';

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codes: {
                first: "FR", 
                second: "US"
            },
            firstCountryCode: "FR",
            secondCountryCode: "US",
            firstCountryData: [],
            secondCountryData: [],
            countries: {
                total: 0,
                first: {
                    parity: {
                        f: [],
                        m: [],
                        total: 0
                    }
                },
                second: {
                    parity: {
                        f: [],
                        m: [],
                        total: 0
                    }
                }
            },
            baseUrl: 'http://localhost:8000/api/',
            type: [
                'people',
                'prices'
            ],
            params: {
                field: 'idprice.idcategory.category',
                country: 'idcountry.code',
                peopleCountry: 'idpeople.idcountry.code',
                gender: 'gender'
            },
        }
    }
    componentDidMount = () => {
        this.getData(this.state.firstCountryCode, 'firstCountryData');
        this.getData(this.state.secondCountryCode, 'secondCountryData');
        this.genderCall(this.state.codes.first, 'first', 'm')
        this.genderCall(this.state.codes.first, 'first', 'f')
        this.genderCall(this.state.codes.second, 'second', 'm')
        this.genderCall(this.state.codes.second, 'second', 'f')
    }
    getData = (countryCode, countryData) => {
        let params = {}
        params[this.state.params.country] = countryCode;
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => {
            const newState = {}
            newState[countryData] = res.data["hydra:member"]
            this.setState({
                ...newState
            })
            
        })
        .catch(err => console.log(err))
    }
    genderCall = (countryCode, index, genderCode) => {
        // param is empty by default
        let params = {}
        // add country param
        params[this.state.params.country] = countryCode;
        params.gender = genderCode;
        // console.log(params)
        // axios call with custom params
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => {
            console.log(params)
            // arayy of people (M/F) of a country
            const response = res.data["hydra:member"];
                // update data state, conserving previous state
                this.setState(prevState => {
                    let countries = Object.assign({}, prevState.countries);
                    countries[index].parity[genderCode] = response;
                    countries[index].parity.total += response.length;
                    countries.total += response.length
                    return { countries };
                }, () => console.log(this.state.countries))
            }
        )
        .catch(err => console.log(err))
        
    }
    
    render() {
        return <section className="Comparator">   
            
            <CompareFields
                firstCountryData={this.state.firstCountryData}
                secondCountryData={this.state.secondCountryData}
            />
            <CompareParity
                countries={this.state.countries}
            />
            <CompareAge
                firstCountryData={this.state.firstCountryGenderData}
                secondCountryData={this.state.secondCountryGenderData}
            />
            <CompareUniversities
                firstCountryData={this.state.firstCountryData}
                secondCountryData={this.state.secondCountryData}
            />
        </section>
    }
}

export default Comparator;
