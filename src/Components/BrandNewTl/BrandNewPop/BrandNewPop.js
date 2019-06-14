
import React, { Component } from 'react';

class BrandNewPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [
                ['01', 'January'], ['02', 'February'], ['03', 'March'],
                ['04', 'April'], ['05', 'May'], ['06', 'June'],
                ['07', 'July'], ['08', 'August'], ['09', 'September'], 
                ['10', 'October'], ['11', 'November'], ['12', 'December']
            ]
        }
    }
    setDate = (date) => {
        const newDate = date.replace(/T\w+|:\w+|\+\w+/g, '').replace(/-/g, ',').split(',').reverse();
        this.state.months.map(month => newDate[1] === month[0] ? newDate.splice(1, 1, month[1]) : null)
        return newDate.join(' ')
    }
    render() {
        console.log(this.props.data)
        return this.props.data.idcountry ? <div className="BrandNewPop">
            <span>{this.props.data.idpeople}</span>
            <h2>{this.props.data.firstname} {this.props.data.name}</h2>
            {this.props.data.birthday ? <span>{this.setDate(this.props.data.birthday)}</span> : null}
            {this.props.data.deathdate ? <span>{this.setDate(this.props.data.deathdate)}</span> : null}
            <span>{this.props.data.idcountry['name']}</span>
            <ul>
                {this.props.data.idprice.map((price, i) => <li key={i}>{price.idcategory.category} - {price.year}</li>)}
            </ul>
        </div> : null

    }
}

export default BrandNewPop;
