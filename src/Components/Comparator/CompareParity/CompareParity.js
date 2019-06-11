
import React, { Component } from 'react';
import ParityTemplate from './ParityTemplate/ParityTemplate'

class CompareParity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // first country
            firstCountry: {
                // parity
                parity: {
                    m: {
                        // amount of men & percent of men
                        amount: 0,
                        percent: 0
                    }, 
                    f: {
                        amount: 0,
                        percent: 0
                    }
                },
            },
            // same pattern
            secondCountry: {
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
            }
        }
     }
    componentDidUpdate = (prevProps) => {
        if ( this.props.countries.total !==  prevProps.countries.total ) {
            console.log('updated')
            // get parity of the 1st country
            this.getParity(this.props.countries.first, "firstCountry")
            // same for the 2nd
            this.getParity(this.props.countries.second, "secondCountry")
        }
    }
    getParity = (data, index) => {
        // parity state pattern
        const parity = {
            m: {
                amount: data.parity.m,
                percent:  Math.floor((data.parity.m / data.parity.total) * 100)
            },
            f: {
                amount: data.parity.f,
                percent: Math.floor((data.parity.f / data.parity.total) * 100)
            }
        }
        // update state with custom key
        const newState = {}
        newState[index] = { parity }
        this.setState({ ...newState })
    }
    setPercent = (amount, totalAmount) => Math.floor((amount / totalAmount) * 100);
    render() {
        return <section className="CompareParity">
            <ParityTemplate
                country={this.state.firstCountry}
            />
            <ParityTemplate
                country={this.state.secondCountry}
            />
        </section>
    }
}

export default CompareParity;
