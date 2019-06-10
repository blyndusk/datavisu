
import React, { Component } from 'react';

class MapPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            },
            fields: {},
            parity: {
                m: {
                    amount: 0,
                    percent: 0
                }, 
                f: {
                    amount: 0,
                    percent: 0
                }
            },
            ageAverage: 0
        }
    }

    displayPop = () => {
        console.log(this.props.data)
        document.querySelector('.Map svg').addEventListener('click', (e) => {
            [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => document.querySelector('.MapPop').style.opacity = 1));
            this.setState({pos: {
                x: e.clientX + 10,
                y: e.clientY + 10
            }})
        })        
    }
    getFieldsAmount = (data) => {
        const fields = {}
        data.map(l => l.idprice.map(price => {
                    const field = price.idcategory.category
                    if (field in fields) fields[field] = fields[field] + 1
                    // else, set to 1
                    else fields[field] = 1
                    return field;
                })
        )
        this.setState({fields})
    }
    getAverageAge = (data) => {
        let ageTotal = 0;
        data.map(l => {
            if (l.birthday && l.idprice[0].year) ageTotal = ageTotal + parseInt(l.idprice[0].year) - parseInt(l.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            return ageTotal
        })
        this.setState({ageAverage: Math.floor(ageTotal / data.length)})
    }
    getParity = (data) => {
        const m = {
            amount: 0,
            percent: 0
        }
        const f = {
            amount: 0,
            percent: 0
        }
        const setPercent = (gender) => Math.floor((gender.amount / data.length) * 100)
        data.map(p => p.gender === 'M' ? m.amount++ : f.amount++)
        m.percent = setPercent(m)
        f.percent = setPercent(f)
        this.setState({
            parity: {
                m: {
                    amount: m.amount,
                    percent: m.percent
                }, 
                f: {
                    amount: f.amount,
                    percent: f.percent
                }
            }
        })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.data !== prevProps.data ||
            this.props.country !== prevProps.country) {
        //   this.fetchData(this.props.userID);
        this.getParity(this.props.data)
        this.getAverageAge(this.props.data)
        this.getFieldsAmount(this.props.data)
        }
      }
    componentDidMount = () => this.displayPop()
    render() {
        return <section 
            className="MapPop"
            style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}
        >
            <h3 className="country">Country: {this.props.data[0].idcountry.name.toUpperCase()}</h3>
            <span>Laureats: {this.props.data.length}</span>
            <ul className="fields">
                {
                    Object.keys(this.state.fields).map(key =>  <li key={key}>{key}: <span>{this.state.fields[key]}</span></li>)}
            </ul>
            <div className="parity">
                Men: {this.state.parity.m.percent}%
                Women: {this.state.parity.f.percent}%
            </div>
            <div className="universities">
                <h4>Top universities</h4>
                <ul>
                    <li>1. <span>DEFAULT_UNIVERSITY_1</span><span></span></li>
                    <li>2. <span>DEFAULT_UNIVERSITY_2</span><span></span></li>
                    <li>3. <span>DEFAULT_UNIVERSITY_3</span><span></span></li>
                </ul>
            </div>
            <div className="age">
                <span>Average age: {this.state.ageAverage}</span>
                <span></span>
            </div>
            
        </section>
    }
}

export default MapPop;