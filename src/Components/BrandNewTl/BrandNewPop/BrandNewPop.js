
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
            <div className="BrandNewPop__image" style={{background: `url('./women/${this.props.data.idpeople}.jpg') no-repeat center/cover`}}></div>
            <h2 className="BrandNewPop__name">{this.props.data.firstname} {this.props.data.name}</h2>
            <ul className="BrandNewPop__prizes">
                {this.props.data.idprice.map((price, i) => <li className="BrandNewPop__prize" key={i}>{price.idcategory.category} - {price.year}</li>)}
            </ul>
              
            {this.props.data.birthday ?
                <div className="BrandNewPop__section">
                    <h3 className="BrandNewPop__subtitle">Born :</h3>
                    <span className="BrandNewPop__text">{this.setDate(this.props.data.birthday)}</span>
                </div>
            : null}
             
            {this.props.data.deathdate ?
                <div className="BrandNewPop__section">
                    <h3 className="BrandNewPop__subtitle">Died :</h3>
                    <span className="BrandNewPop__text">{this.setDate(this.props.data.deathdate)}</span>
                </div>
            : null}
            
            <div className="BrandNewPop__section">
                <h3 className="BrandNewPop__subtitle">Nationality :</h3>
                <span className="BrandNewPop__text">{this.props.data.idcountry['name']}</span>
            </div>
        </div> : null

    }
}

export default BrandNewPop;
