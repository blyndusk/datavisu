
import React, { Component } from 'react';
import AgeTemplate from './AgeTemplate/AgeTemplate';

class CompareAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCountry: {
                    m: 0,
                    f: 0

            },
            secondCountry: {

                    m: 0,
                    f: 0
            }
        }
    }
    componentDidUpdate = (prevProps) => {
        if ( this.props.countries.total !== prevProps.countries.total ) {
            console.log('updated age')
            this.getAverageAge(this.props.countries.first.parity, "firstCountry")
            this.getAverageAge(this.props.countries.second.parity, "secondCountry")
        }
    }
   
    getAverageAge = (data, index) => {
        const averageAge = { m: 0, f: 0 }
        this.getAvegrageAgeGender(data, averageAge, 'm')
        this.getAvegrageAgeGender(data, averageAge, 'f')
        const newState = {};
        newState[index] = averageAge;
        this.setState({ ...newState })
    }
    getAvegrageAgeGender = (data, avagerageAge,  genderCode) => {
        data = data[genderCode];
        // total age begins to 0
        let ageTotal = 0;
        // map over all given data
        data.map(people => {
            // if people birthday && people's first price's year exist, increment total age with people age
            if (people.birthday && people.idprice[0].year) ageTotal = ageTotal + parseInt(people.idprice[0].year) - parseInt(people.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            return ageTotal;
        })
        // then, set age average to state, doing the average
        avagerageAge[genderCode] = Math.floor(ageTotal / data.length)
    }
    render() {
        return <section className="CompareAge">   
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
