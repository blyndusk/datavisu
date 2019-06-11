
import React, { Component } from 'react';
import FieldTemplate from './FieldTemplate/FieldTemplate'

class CompareFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCountry: {
                fields: {}
            },
            secondCountry: {
                fields: {}
            }
        }
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.firstCountryData !== prevProps.firstCountryData ) {
            console.log('first');
            this.setState({firstCountry: {
                name: this.props.firstCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.firstCountryData, 0)
            
        }
        if (this.props.secondCountryData !== prevProps.secondCountryData) {
            console.log('second');
            this.setState({secondCountry: {
                name: this.props.secondCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.secondCountryData, 1)
        }
    }
    setCountry = (data, countrybin) => {
        this.getFieldsAmount(data, countrybin);
    }
    getFieldsAmount = (data, countrybin) => {
        // fields is an object which contain fields with amounts of prize for each field
        const fields = {};
        // map over all given data, and over each prize of each people
        data.map(people => people.idprice.map(price => {
            // get field of price
            const field = price.idcategory.category
            // if field exist in fields, increment it by 1
            if (field in fields) fields[field] = fields[field] + 1
            // else, set to 1
            else fields[field] = 1
            return field;
        }))
        // then, set fields to state
        this.setState({fields})
        if (countrybin === 0) {
            this.setState({ firstCountry: { fields }})
        }
        if (countrybin === 1) {
            this.setState({ secondCountry: { fields }})
        }
        
    }
    
    render() {
        return <section className="CompareFields">   
            <FieldTemplate
                country={this.state.firstCountry}
                order={0}
            />
            <FieldTemplate
                country={this.state.secondCountry}
                order={1}
            />
        </section>
    }
}

export default CompareFields;
