
import React, { Component } from 'react';
import AgeTemplate from './AgeTemplate/AgeTemplate';
import { string } from 'prop-types';

interface CompareAgeProps {
    countries: {
        first: {
            parity: any
        }  
        second: {
            parity: any
        }
        total: number
    }
}

interface CompareAgeState {
    firstCountry: {
        m: 0,
        f: 0
    },
    secondCountry: {
        m: 0,
        f: 0
    }
}

class CompareAge extends React.Component<CompareAgeProps, CompareAgeState> {
    componentDidUpdate = (prevProps: { countries: {total: number}}) => {
        if ( this.props.countries.total !== prevProps.countries.total ) {
            // get average age for the 2 countries
            this.getAverageAge(this.props.countries.first.parity, "firstCountry")
            this.getAverageAge(this.props.countries.second.parity, "secondCountry")
        }
    }
    // get avergae age for a country
    getAverageAge = (data: any, index: string) => {
        const averageAge = { m: 0, f: 0 }
        // set men average age
        this.getAvegrageAgeGender(data, averageAge, 'm')
        // set women average age
        this.getAvegrageAgeGender(data, averageAge, 'f')
        // new state template
        const newState: any = {};
        // add average age for a country
        newState[index] = averageAge;
        // spread new state
        this.setState({ ...newState })
    }
    getAvegrageAgeGender = (data: any, avagerageAge: any,  genderCode: string) => {
        data = data[genderCode];
        // total age begins to 0
        let ageTotal = 0;
        // map over all given data
        data.map((people: any) => {
            // if people birthday && people's first price's year exist, increment total age with people age
            if (people.birthday && people.idprice[0].year) ageTotal = ageTotal + parseInt(people.idprice[0].year) - parseInt(people.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            return ageTotal;
        })
        // then, set age average to state, doing the average
        avagerageAge[genderCode] = Math.floor(ageTotal / data.length)
    }
    render() {
        return <section className="CompareAge Comparator__section">   
            <h3 className="Comparator__subtitle">Average age</h3>
            <AgeTemplate
                country={this.state.firstCountry}
                order={0}
            />
            <AgeTemplate
                country={this.state.secondCountry}
                order={1}
            />
        </section>
    }
}

export default CompareAge;
