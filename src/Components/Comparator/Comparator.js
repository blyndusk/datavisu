
import React, { Component } from 'react';

import CompareAge from './CompareAge/CompareAge';
import CompareFields from './CompareFields/CompareFields';
import CompareParity from './CompareParity/CompareParity';
import CompareUniversities from './CompareUniversities/CompareUniversities';
import ComparatorInput from './ComparatorInput/ComparatorInput'
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
                codes: [],
                first: {
                    // code for the country
                    code: "FR",
                    name: "France",
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
                    name: "USA",
                    data: [],
                    parity: {
                        f: [],
                        m: [],
                        total: 0
                    }
                }
            },
            codes:  [],
            // base url for API call
            baseUrl: 'http://localhost:8000/api/',
            // 2 types of routes
            type: [
                'people',
                'prices',
                'countries'
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
        this.getCodes()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.firstCountryCode !== prevState.firstCountryCode ||
            this.state.secondCountryCode !== prevState.secondCountryCode) {
                this.setState(prevState => {
                    let countries = Object.assign({}, prevState.countries);
                    // set response to code,  
                    countries.first.parity.total = 0;
                    // total of the country
                    countries.second.parity.total = 0;
                    // & global total
                    countries.total = 0;
                    return { countries };
                })
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
            this.getCodes()
        }
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
    getCodes = () => {
        axios.get(this.state.baseUrl + this.state.type[0])
            .then(res => {
                const response =  res.data["hydra:member"]
                const codes = []
                response.map(people => {
                    const code = people.idcountry.code
                    if (codes.indexOf(code) === -1) codes.push(code)
                    return code
                })
                // this.setState({
                //     codes: codes.sort()
                // })
            })
            .catch(err => console.log(err))
            axios.get(this.state.baseUrl + this.state.type[2])
            .then(res => {
                const response = res.data["hydra:member"]
                console.log(response);
                this.setState({
                    codes: response.sort((a, b) => {
                        if (a.code < b.code) return -1; 
                        if (a.code > b.code) return 1; 
                        return 0;
                    })
                })
            })
            .catch(err => console.log(err))
    }
    onInputChanged = (e, index) => {
        this.state.codes.map(code => {
            if (e.target.value.length === 2 && e.target.value === code.code) {
                const newCode = e.target.value
                this.state.codes.map(code => newCode === code.code ? this.setState(prevState => {
                    let countries = Object.assign({}, prevState.countries);
                    // set response to code,  
                    countries[index].name = code.name
                    countries[index].code = code.code
                    return { countries };
                }) : null)
                if (index === 'first') this.setState({firstCountryCode: newCode})
                else if (index === 'second') this.setState({secondCountryCode: newCode})
            }
        })
        
    }  
    render() {
        return <section className="Comparator" onClick={(e) => {
            e.stopPropagation();
            [...document.querySelectorAll('form')].map(form => form.classList.remove('ComparatorInput--active'))
        }}>
            <h3 className="Comparator__title">
                <span className="Comparator__country">{this.state.countries.first.name}</span>
                <span className="Comparator__versus">vs</span>
                <span className="Comparator__country">{this.state.countries.second.name}</span>
            </h3>
            <ComparatorInput
                codes={this.state.codes}
                code={this.state.countries.first.code}
                onInputChanged={(e) => this.onInputChanged(e, 'first')}
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
            <button className="Comparator__close" onClick={() => window.history.back()}></button>
            <ComparatorInput
                codes={this.state.codes}
                code={this.state.countries.second.code}
                onInputChanged={(e) => this.onInputChanged(e, 'second')}
            />
        </section>
    }
}

export default Comparator;
