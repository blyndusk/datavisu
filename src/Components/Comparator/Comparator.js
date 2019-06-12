
import React, { Component } from 'react';

import CompareAge from './CompareAge/CompareAge';
import CompareFields from './CompareFields/CompareFields';
import CompareParity from './CompareParity/CompareParity';
import CompareUniversities from './CompareUniversities/CompareUniversities';
import ComparatorInput from './ComparatorInput/ComparatorInput'
import Nav from '../Nav/Nav';
import axios from 'axios';

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCountryCode: "FR",
            secondCountryCode: "US",
            firstCountryData: [],
            secondCountryData: [],
            // countries
            countries: {
                // total of people
                total: 0,
                first: {
                    // code for the country
                    code: "FR",
                    data: [],
                    // parity
                    parity: {
                        f: [],
                        m: [],
                        // total of people of the country
                        total: 0
                    }
                },
                // same pattern
                second: {
                    code: "US",
                    data: [],
                    parity: {
                        f: [],
                        m: [],
                        total: 0
                    }
                }
            },
            // base url for API call
            baseUrl: 'http://9f712c9f.ngrok.io/api/',
            // 2 types of routes
            type: [
                'people',
                'prices'
            ],
            // diffrent params
            params: {
                field: 'idprice.idcategory.category',
                country: 'idcountry.code',
                peopleCountry: 'idpeople.idcountry.code',
                gender: 'gender'
            },
        }
    }
    componentDidMount = () => {
        const codes = [
            [
                this.state.countries.first.code,
                'first'
            ],
            [
                this.state.countries.second.code,
                'second'
            ]
        ]
        this.getData(this.state.firstCountryCode, 'firstCountryData', 'first');
        this.getData(this.state.secondCountryCode, 'secondCountryData', 'second');
        // 4 calls:
        //  - men of 1st country
        //  - women of 1st country
        //  - men of 2nd country
        //  - women of 2nd country
        this.getCountryDataWithGender(codes[0][0], codes[0][1], 'm')
        this.getCountryDataWithGender(codes[0][0], codes[0][1], 'f')
        this.getCountryDataWithGender(codes[1][0], codes[1][1], 'm')
        this.getCountryDataWithGender(codes[1][0], codes[1][1], 'f')
    }
    getData = (countryCode, countryData, index) => {
        let params = {}
        params[this.state.params.country] = countryCode;
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => {
            const newState = {}
            const response = res.data["hydra:member"];
            newState[countryData] = res.data["hydra:member"]
            this.setState({
                ...newState
            })
            this.setState(prevState => {
                let countries = Object.assign({}, prevState.countries);
                // set response to code,  
                countries[index].data = response;
                return { countries };
            })
            
        })
        .catch(err => console.log(err))
    }
    // 3 params:
    //  - country code (FR, US)
    //  - index (first, second)
    //  - gender code (m, f)
    getCountryDataWithGender = (countryCode, index, genderCode) => {
        // param is empty by default
        let params = {}
        // add country param
        params[this.state.params.country] = countryCode;
        // add gender param
        params[this.state.params.gender]  = genderCode;
        // axios call with custom params
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, set state with parsed data
        .then(res => {
            // arayy of people (M/F) of a country
            const response = res.data["hydra:member"];
            // update state, conserving previous state
            this.setState(prevState => {
                let countries = Object.assign({}, prevState.countries);
                // set response to code,  
                countries[index].parity[genderCode] = response;
                // total of the country
                countries[index].parity.total += response.length;
                // & global total
                countries.total += response.length
                return { countries };
            })
        })
        .catch(err => console.log(err))
        
    }
    
    render() {
        return <section className="Comparator">   
            <Nav/>
            <ComparatorInput
                getCode={(e) => console.log(e.target.value)}
            />
            <CompareFields
                // give all country object
                countries={this.state.countries}
            />
            <CompareParity
                // give all country object
                countries={this.state.countries}
            />
            <CompareAge
               // give all country object
               countries={this.state.countries}
            />
            <CompareUniversities
                firstCountryData={this.state.firstCountryData}
                secondCountryData={this.state.secondCountryData}
            />
        </section>
    }
}

export default Comparator;
