
import React, { Component } from 'react';
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
            data: []
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
                    return woman
                })
                this.setState({ data })
            })
    }
    render() {
        return <section className="BrandNewTl">
            {this.state.data.map((woman, i) => <div key={i}>
                <span>{woman.length}</span>
                <ul>
                    {woman.map((li, i) => {
                        console.log(li)
                        return <li key={i}>{li.firstname}</li>
                    })}
                </ul>
            </div>)}
        </section>
    }
}

export default BrandNewTl;
