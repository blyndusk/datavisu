
import React from 'react';
import UniversityTemplate from './UniveristyTemplate/UniveristyTemplate';

interface P {
    firstCountryData: [{idaffiliation: { address: string}}];
    secondCountryData: [{idaffiliation: { address: string}}];
}

interface S {
    firstCountry: any;
    secondCountry: any;
}

class CompareUniversities extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            firstCountry: {
                sortedUniversities: [],
                universities: {},
            },
            secondCountry: {
                sortedUniversities: [],
                universities: {},
            },
        };
    }
    componentDidUpdate = (prevProps: {firstCountryData: {}, secondCountryData: {}}) => {
        if (this.props.firstCountryData !== prevProps.firstCountryData) this.setCountry(this.props.firstCountryData, 0);
        if (this.props.secondCountryData !== prevProps.secondCountryData) this.setCountry(this.props.secondCountryData, 1);
    }
    setCountry = (data: [{idaffiliation: { address: string}}], countrybin: number) => this.getUniversities(data, countrybin);
    getUniversities = (data: [{idaffiliation: { address: string}}], countrybin: number) => {
        const universities: any = {};
        // map over all given data, and over each prize of each people
        data.map(people => {
            // get field of price
            let university: string = '';
            if (people.idaffiliation) university = people.idaffiliation.address;
            if (university !== undefined) {
                // if university exist in universities, increment it by 1
                if (university in universities) universities[university]++;
                // else, set to 1
                else universities[university] = 1;
            }
            return university;
        });
        let sortedUniversities = [];
        for (const universityKey in universities) sortedUniversities.push([universityKey, universities[universityKey]]);
        sortedUniversities.sort((a, b) => b[1] - a[1]);
        sortedUniversities = sortedUniversities.splice(0, 3);
        if (countrybin === 0) {
            this.setState({ firstCountry: {
                sortedUniversities,
                universities: {...universities},
            }});
        }
        if (countrybin === 1) {
            this.setState({ secondCountry: {
                sortedUniversities,
                universities: {...universities},
            }});
        }
    }
    render() {
        return <section className='CompareUniversities Comparator__section'>
            <h3 className='Comparator__subtitle'>Top Universities</h3>
            <UniversityTemplate
                country={this.state.firstCountry}
                order={0}
            />
            <UniversityTemplate
                country={this.state.secondCountry}
                order={1}
            />
        </section>;
    }
}

export default CompareUniversities;
