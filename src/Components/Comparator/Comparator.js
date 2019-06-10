
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
            firstCountryCode: "FR",
            secondCountryCode: "RU",
            firstCountryData: [],
            secondCountryData: [],
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
        }
    }
    componentDidMount = () => {
        this.getData(this.state.firstCountryCode, 'firstCountryData');
        this.getData(this.state.secondCountryCode, 'secondCountryData');
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
    render() {
        return <section className="Comparator">   
            <h2>Comparator</h2>
            <CompareAge/>
            <CompareFields
                firstCountryData={this.state.firstCountryData}
                secondCountryData={this.state.secondCountryData}
            />
            <CompareParity
                firstCountryData={this.state.firstCountryData}
                secondCountryData={this.state.secondCountryData}
            />
            <CompareUniversities/>
        </section>
    }
}

export default Comparator;
