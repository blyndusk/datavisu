
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
    componentDidMount = () => this.displayPop()
    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) this.getParsedData();
    }
    getParsedData = () => {
        this.getFieldsAmount(this.props.data)
        this.getParity(this.props.data)
        this.getAverageAge(this.props.data)
    }
    displayPop = () => {
        document.querySelector('.Map svg').addEventListener('click', (e) => {
            [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => document.querySelector('.MapPop').style.opacity = 1));
            this.setState({pos: {
                x: e.clientX + 10,
                y: e.clientY + 10
            }})
        })        
    }
    // method to get field for reach price
    getFieldsAmount = (data) => {
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
    }
    // method to get percentage of M/W for each people
    getParity = (data) => {
        // parity content amount of men & women, and percentage
        const parity = {
            m: {
                amount: 0,
                percent: 0
            },
            f: {
                amount: 0,
                percent: 0
            }
        }
        // set percent in terms of amount
        const setPercent = (gender) => Math.floor((gender.amount / data.length) * 100);
        // map over all people in given data, and of people if man, increment m, else f
        data.map(people => people.gender === 'M' ? parity.m.amount++ : parity.f.amount++);
        // set percent for men & women
        parity.m.percent = setPercent(parity.m)
        parity.f.percent = setPercent(parity.f)
        // then, set parity to state
        this.setState({ parity })
    }
    // method ot get average age of all people
    getAverageAge = (data) => {
        // total age begins to 0
        let ageTotal = 0;
        // map over all given data
        data.map(people => {
            // if people birthday && people's first price's year exist, increment total age with people age
            if (people.birthday && people.idprice[0].year) ageTotal = ageTotal + parseInt(people.idprice[0].year) - parseInt(people.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            return ageTotal;
        })
        // then, set age average to state, doing the average
        this.setState({ageAverage: Math.floor(ageTotal / data.length)})
    }
    render() {
        return <section 
            className="MapPop"
            style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}
        >
            <h3 className="country">Country: {this.props.data[0].idcountry.name.toUpperCase()}</h3>
            <span>Laureats: {this.props.data.length}</span>
            <ul className="fields">
                { Object.keys(this.state.fields).map(key =>  <li key={key}>{key}: <span>{this.state.fields[key]}</span></li>)}
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