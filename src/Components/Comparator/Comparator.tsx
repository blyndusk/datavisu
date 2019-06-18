
import React from 'react';

import ComparatorInput from './ComparatorInput/ComparatorInput';
import CompareAge from './CompareAge/CompareAge';
import CompareFields from './CompareFields/CompareFields';
import CompareParity from './CompareParity/CompareParity';
import CompareUniversities from './CompareUniversities/CompareUniversities';

import axios from 'axios';

interface P {}

interface S {
    firstCountryCode: string;
    secondCountryCode: string;
    firstCountryData: [{ idaffiliation: { address: string; }; }];
    secondCountryData: [{ idaffiliation: { address: string; }; }];
    // countries
    countries: {
        // total of people
        total: number,
        codes: any[],
        first: {
            // code for the country
            code: string,
            name: string,
            data: any[],
            // parity
            parity: {
                f: any[],
                m: any[],
                // total of people of the country
                total: number,
            },
        },
        // same pattern
        second: {
            code: string,
            name: string,
            data: any[],
            parity: {
                f: any[],
                m: any[],
                total: number,
            },
        },
    };
    codes: string[];
    // base url for API call
    baseUrl: string;
    // 2 types of routes
    type: string[];
    // diffrent params
    params: {
        field: string;
        country: string;
        peopleCountry: string;
        gender: string;
    };
}

export default class Comparator extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            // base url for API call
            baseUrl: 'http://localhost:8000/api/',
            codes: [],
            // countries
            countries: {
                codes: [],
                first: {
                    // code for the country
                    code: 'FR',
                    data: [],
                    name: 'France',
                    // parity
                    parity: {
                        f: [],
                        m: [],
                        // total of people of the country
                        total: 0,
                    },
                },

                // same pattern
                second: {
                    // code for the country
                    code: 'US',
                    data: [],
                    name: 'USA',
                    // parity
                    parity: {
                        f: [],
                        m: [],
                        // total of people of the country
                        total: 0,
                    },
                },
                // total of people
                total: 0,
            },
            firstCountryCode: 'FR',
            firstCountryData: [{ idaffiliation: { address: '' } }],
             // diffrent params
            params: {
                country: 'idcountry.code',
                field: 'idprice.idcategory.category',
                gender: 'gender',
                peopleCountry: 'idpeople.idcountry.code',
            },
            secondCountryCode: 'US',
            secondCountryData: [{ idaffiliation: { address: '' } }],
            // 2 types of routes
            type: [
                'people',
                'prices',
                'countries',
            ],
        };
    }
    componentDidMount = () => {
        const codes = [
            [
                this.state.countries.first.code,
                'first',
            ],
            [
                this.state.countries.second.code,
                'second',
            ],
        ];
        this.getData(this.state.firstCountryCode, 'firstCountryData', 'first');
        this.getData(this.state.secondCountryCode, 'secondCountryData', 'second');
        // 4 calls:
        //  - men of 1st country
        //  - women of 1st country
        //  - men of 2nd country
        //  - women of 2nd country
        this.getCountryDataWithGender(codes[0][0], codes[0][1], 'm');
        this.getCountryDataWithGender(codes[0][0], codes[0][1], 'f');
        this.getCountryDataWithGender(codes[1][0], codes[1][1], 'm');
        this.getCountryDataWithGender(codes[1][0], codes[1][1], 'f');
        this.getCodes();
    }
    componentDidUpdate(prevProps: {}, prevState: { firstCountryCode: string, secondCountryCode: string}) {
        if (this.state.firstCountryCode !== prevState.firstCountryCode ||
            this.state.secondCountryCode !== prevState.secondCountryCode) {
            this.setState(prev => {
                const countries = {...prev.countries};
                // set response to code,
                countries.first.parity.total = 0;
                // total of the country
                countries.second.parity.total = 0;
                // & global total
                countries.total = 0;
                return { countries };
            });
            const codes = [
                [
                    this.state.countries.first.code,
                    'first',
                ],
                [
                    this.state.countries.second.code,
                    'second',
                ],
            ];
            this.getData(this.state.firstCountryCode, 'firstCountryData', 'first');
            this.getData(this.state.secondCountryCode, 'secondCountryData', 'second');
            // 4 calls:
            //  - men of 1st country
            //  - women of 1st country
            //  - men of 2nd country
            //  - women of 2nd country
            this.getCountryDataWithGender(codes[0][0], codes[0][1], 'm');
            this.getCountryDataWithGender(codes[0][0], codes[0][1], 'f');
            this.getCountryDataWithGender(codes[1][0], codes[1][1], 'm');
            this.getCountryDataWithGender(codes[1][0], codes[1][1], 'f');
            this.getCodes();
        }
    }
    getData = (countryCode: string, countryData: any, index: string) => {
        const params: any = {};
        params[this.state.params.country] = countryCode;
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => {
            const newState: any = {};
            const response = res.data['hydra:member'];
            newState[countryData] = res.data['hydra:member'];
            this.setState({
                ...newState,
            });
            this.setState(prevState => {
                const countries: any = {...prevState.countries};
                // set response to code,
                countries[index].data = response;
                return { countries };
            });

        })
        .catch(err => console.error(err));
    }
    // 3 params:
    //  - country code (FR, US)
    //  - index (first, second)
    //  - gender code (m, f)
    getCountryDataWithGender = (countryCode: string, index: string, genderCode: string) => {
        // param is empty by default
        const params: any = {};
        // add country param
        params[this.state.params.country] = countryCode;
        // add gender param
        params[this.state.params.gender]  = genderCode;
        // axios call with custom params
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, set state with parsed data
        .then(res => {
            // arayy of people (M/F) of a country
            const response = res.data['hydra:member'];
            // update state, conserving previous state
            this.setState(prevState => {
                const countries: any = {...prevState.countries};
                // set response to code,
                countries[index].parity[genderCode] = response;
                // total of the country
                countries[index].parity.total += response.length;
                // & global total
                countries.total += response.length;
                return { countries };
            });
        })
        .catch(err => console.error(err));
    }
    getCodes = () => {
        axios.get(this.state.baseUrl + this.state.type[0])
            .then(res => {
                const response =  res.data['hydra:member'];
                const codes: string[] = [];
                response.map((people: {idcountry: {code: string}}) => {
                    const code = people.idcountry.code;
                    if (codes.indexOf(code) === -1) codes.push(code);
                    return code;
                });
            })
            .catch(err => console.error(err));
        axios.get(this.state.baseUrl + this.state.type[2])
            .then(res => {
                const response = res.data['hydra:member'];
                this.setState({
                    codes: response.sort((a: {code: string}, b: {code: string}) => {
                        if (a.code < b.code) return -1;
                        if (a.code > b.code) return 1;
                        return 0;
                    }),
                });
            })
            .catch(err => console.error(err));
    }
    onInputChanged = (e: any, index: string) => {
        this.state.codes.map((code: any) => {
            if (e.target.value.length === 2 && e.target.value === code.code) {
                const newCode = e.target.value;
                this.state.codes.map((code2: any) => newCode === code2.code ? this.setState(prevState => {
                    const countries: any = {...prevState.countries};
                    // set response to code,
                    countries[index].name = code2.name;
                    countries[index].code = code2.code;
                    return { countries };
                }) : null);
                if (index === 'first') this.setState({firstCountryCode: newCode});
                else if (index === 'second') this.setState({secondCountryCode: newCode});
            }
        });
    }
    disableActiveInput = (e: any) => {
        e.stopPropagation();
        Array.from(document.querySelectorAll('form')).map(form => form.classList.remove('ComparatorInput--active'));
    }
    render() {
        return <section
            className='Comparator'
            onClick={this.disableActiveInput}
        >
            <h3 className='Comparator__title'>
                <span className='Comparator__country'>{this.state.countries.first.name}</span>
                <span className='Comparator__versus'>vs</span>
                <span className='Comparator__country'>{this.state.countries.second.name}</span>
            </h3>
            <ComparatorInput
                codes={this.state.codes}
                code={this.state.countries.first.code}
                onInputChanged={(e: any) => this.onInputChanged(e, 'first')}
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
            <button className='Comparator__close' onClick={window.history.back}/>
            <ComparatorInput
                codes={this.state.codes}
                code={this.state.countries.second.code}
                onInputChanged={(e: any) => this.onInputChanged(e, 'second')}
            />
        </section>;
    }
}
