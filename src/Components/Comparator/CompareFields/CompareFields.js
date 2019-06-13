
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
        if (this.props.countries.total !== prevProps.countries.total ) {
            this.getFieldsAmount(this.props.countries.first.data, 0)
            this.getFieldsAmount(this.props.countries.second.data, 1)
        }
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
        if (countrybin === 0) this.setState({ firstCountry: { fields }})
        if (countrybin === 1) this.setState({ secondCountry: { fields }})
        
    }
    
    render() {
        return <section className="CompareFields Comparator__section">
            <h3 className="Comparator__subtitle">Fields</h3>
            <div className="Comparator__legend">
                <div className="Comparator__dots">
                    <div className="Comparator__dot"></div>
                    <div className="Comparator__dot"></div>
                    <div className="Comparator__dot"></div>
                    <div className="Comparator__dot"></div>
                    <div className="Comparator__dot"></div>
                    <div className="Comparator__dot"></div>
                </div>
                <div className="Comparator__labels">
                    <span className="Comparator__label">Phy</span>
                    <span className="Comparator__label">Chem</span>
                    <span className="Comparator__label">Med</span>
                    <span className="Comparator__label">Pea</span>
                    <span className="Comparator__label">Litt</span>
                    <span className="Comparator__label">Eco</span>
                </div>
            </div>
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
