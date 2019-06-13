
import React, { Component } from 'react';
import { spawn } from 'child_process';

class BrandNewPop extends Component {
    
    render() {
        console.log(this.props.data)
        return this.props.data.idcountry ? <div className="BrandNewPop">
            <h2>{this.props.data.firstname} {this.props.data.name}</h2>
            <span>{this.props.data.birthday}</span>
            <span>{this.props.data.deathdate}</span>
            <span>{this.props.data.idcountry['name']}</span>
            <ul>
                {this.props.data.idprice.map((price, i) => <li key={i}>{price.idcategory.category} - {price.year}</li>)}
            </ul>
        </div> : null
        
    }
}

export default BrandNewPop;
