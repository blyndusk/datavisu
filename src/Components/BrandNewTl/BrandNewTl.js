
import React, { Component } from 'react';
import Nav from './../Nav/Nav'
import Brand from './../Brand/Brand'
import Compare from './../Compare/Compare'
import BrandNewPop from './BrandNewPop/BrandNewPop'
import axios from 'axios';

class BrandNewTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: 'http://774d8b0b.ngrok.io/api/',
            // 2 types of API filters
            type: [
                'people',
                'prices', 
                'categories'
            ],
            data: [],
            dates: [
                "1901-1920",
                "1921-1940",
                "1941-1960",
                "1961-1980",
                "1981-2000",
                "2001-2018",
            ],
            woman: {},
            displayWomen: false
        }
    }
    componentDidMount = () => {
        axios.get(this.state.baseUrl + this.state.type[0])
            .then(res => {
                const response = res.data["hydra:member"];
                const womanData = [];
                const data = [[], [], [], [], [], []]
                response.map(people => people.gender === 'F' ? womanData.push(people) : null)
                womanData.map(woman => {
                    const year = woman.idprice[0].year
                    if (year <= 1921 ) data[0].push(woman)
                    else if (year <= 1941 ) data[1].push(woman)
                    else if (year <= 1961 ) data[2].push(woman)
                    else if (year <= 1981 ) data[3].push(woman)
                    else if (year <= 2001 ) data[4].push(woman)
                    else if (year <= 2020 ) data[5].push(woman)
                    return woman;
                })
                this.setState({ data })
            })
    }
    displayWomen = (e) => {
        [...document.querySelectorAll('.BrandNewTl__item')].map(child => child.classList.remove('BrandNewTl__item--active'));
        e.target.parentNode.classList.toggle('BrandNewTl__item--active')
    }
    displayWoman = (li) => {
        this.setState({
            woman: li
        })
    }
    render() {
        return <section className="BrandNewTl">
            <Brand />
            <Nav />
            <div className="BrandNewTl__items">
                {this.state.data.map((woman, i) => <div className="BrandNewTl__item" key={i}>
                    <div className="BrandNewTl__number" onClick={this.displayWomen}>{woman.length}</div>
                    <div className="BrandNewTl__dates" onClick={this.displayWomen}>{this.state.dates[i]}</div>
                    <ul className="BrandNewTl__laureats">
                        {woman.map((li, i) => {
                            return <li className="BrandNewTl__laureat" key={i} onClick={() => this.displayWoman(li)}>
                                <div className="BrandNewTl__image" style={{background: `url('./women/${li.idpeople}.jpg') no-repeat center/cover`}}></div>
                                <p className="BrandNewTl__name"><span>{li.firstname}</span><span>{li.name}</span></p>
                            </li>
                        })}
                    </ul>
                </div>)}
                <BrandNewPop
                    data={this.state.woman}
                />
            </div>
            <Compare />
        </section>
    }
}

export default BrandNewTl;
