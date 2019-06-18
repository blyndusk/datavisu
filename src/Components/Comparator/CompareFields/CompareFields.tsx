
import React from 'react';
import FieldsLegend from './FieldsLegend/FieldsLegend';
import FieldTemplate from './FieldTemplate/FieldTemplate';

interface P {
    countries: {
        first: {
            data: any[];
        },
        second: {
            data: any[];
        }
        total: number;
    };
}

interface S {
    firstCountry: { fields: {} };
    secondCountry: { fields: {} };
    fields: {};
}

export default class CompareFields extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            fields: {},
            firstCountry: { fields: {} },
            secondCountry: { fields: {} },
        };
    }
    componentDidUpdate = (prevProps: { countries: { total: number}}) => {
        if (this.props.countries.total !== prevProps.countries.total) {
            this.getFieldsAmount(this.props.countries.first.data, 0);
            this.getFieldsAmount(this.props.countries.second.data, 1);
        }
    }
    getFieldsAmount = (data: Array<{idprice: Array<{idcategory: {category: string}}>}>, countrybin: number) => {
        // fields is an object which contain fields with amounts of prize for each field
        const fields: any = {};
        // map over all given data, and over each prize of each people
        data.map(people => people.idprice.map(price => {
            // get field of price
            const field: string = price.idcategory.category;
            // if field exist in fields, increment it by 1
            if (field in fields) fields[field]++;
            // else, set to 1
            else fields[field] = 1;
            return field;
        }));
        // then, set fields to state
        this.setState({fields});
        if (countrybin === 0) this.setState({ firstCountry: { fields }});
        if (countrybin === 1) this.setState({ secondCountry: { fields }});
    }
    render() {
        return <section className='CompareFields Comparator__section'>
            <h3 className='Comparator__subtitle'>Fields</h3>
            <FieldsLegend/>
            <FieldTemplate
                country={this.state.firstCountry}
                order={0}
            />
            <FieldTemplate
                country={this.state.secondCountry}
                order={1}
            />
        </section>;
    }
}
