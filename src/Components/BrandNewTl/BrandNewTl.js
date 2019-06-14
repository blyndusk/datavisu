
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
            baseUrl: 'http://localhost:8000/api/',
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
            displayWomen: false,
            coords: {
                x: 0,
                y: 0
            }
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
        // document.querySelector('.BrandNewPop').style.display = 'none'
        if (document.querySelector('.BrandNewPop')) document.querySelector('.BrandNewPop').style.opacity = 0
        
    }
    displayWoman = (e, li) => {
        console.log(e.clientX, e.clientY)
        console.log(li)
        
        this.setState({
            woman: li,
            coords: {
                x: e.clientX > Math.floor(window.innerWidth * 1) ? Math.floor(window.innerWidth * 0.66) : e.clientX + 10,
                y: e.clientY > Math.floor(window.innerHeight * 1) ? Math.floor(window.innerHeight * 0.33) : e.clientY + 10
            }
        });
        document.querySelector('.BrandNewTl__tutorial').style.display = 'none'
        if (document.querySelector('.BrandNewPop')) document.querySelector('.BrandNewPop').style.opacity = 1
    }
    render() {
        return <section className="BrandNewTl">
            <Brand />
            <Nav />
            <p className="BrandNewTl__context">We decided to focus on women, which are winning more and more prizes every year</p>
            <div className="BrandNewTl__items">
                {this.state.data.map((woman, i) => <div className="BrandNewTl__item" key={i}>
                    <div className="BrandNewTl__number" onClick={this.displayWomen}>{woman.length}</div>
                    <div className="BrandNewTl__dates" onClick={this.displayWomen}>{this.state.dates[i]}</div>
                    <ul className="BrandNewTl__laureats">
                        {woman.map((li, i) => {
                            return <li className="BrandNewTl__laureat" key={i} onClick={(e) => this.displayWoman(e, li)}>
                                <div className="BrandNewTl__image" style={{background: `url('./women/${li.idpeople}.jpg') no-repeat center/cover`}}></div>
                            </li>
                        })}
                    </ul>
                </div>)}
                <BrandNewPop
                    data={this.state.woman}
                    coords={this.state.coords}
                />
            </div>
            <p className="BrandNewTl__tutorial">Select colored period to visualize laureats</p>
            <Compare />
        </section>
    }
}

export default BrandNewTl;
