
import React, { Component } from 'react';
import AgeTemplate from './AgeTemplate/AgeTemplate';

class CompareAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCountry: {
                averageAge: {
                    m: 0,
                    f: 0
                }
            },
            secondCountry: {
                averageAge: {
                    m: 0,
                    f: 0
                }
            }
        }
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.firstCountryData !== prevProps.firstCountryData ) {

            
            this.setCountry(this.props.firstCountryData, 0)
            
        }
        if (this.props.secondCountryData !== prevProps.secondCountryData) {

            this.setCountry(this.props.secondCountryData, 1)
        }
    }
    getAverageAge = (data) => {
        console.log(data)
        // total age begins to 0
        let ageTotal = 0;
        // map over all given data
        data.map(people => {
            // if people birthday && people's first price's year exist, increment total age with people age
            if (people.birthday && people.idprice[0].year) ageTotal = ageTotal + parseInt(people.idprice[0].year) - parseInt(people.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            return ageTotal;
        })
        console.log(ageTotal)
        // then, set age average to state, doing the average
        this.setState({ageAverage: Math.floor(ageTotal / data.length)})
    }
    render() {
        return <section className="CompareAge">   
            <h2>CompareAge</h2>
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
