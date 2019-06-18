
import React from 'react';
import ParityTemplate from './ParityTemplate/ParityTemplate'

interface P {
    countries: {
        total: number,
        first: {
            parity: { m: any[], f: any[], total: number }
        },
        second: {
            parity: { m: any[], f: any[], total: number }
        }
    }
}

interface S {
    // first country
    firstCountry: {
        // parity
        parity: {
            m: {
                // amount of men & percent of men
                amount: number,
                percent: number
            }, 
            f: {
                amount: number,
                percent: number
            }
        },
    },
    // same pattern
    secondCountry: {
        parity: {
            m: {
                amount: number,
                percent: number
            }, 
            f: {
                amount: number,
                percent: number
            }
        },
    }
}

export default class CompareParity extends React.Component<P, S> {
    constructor(props: P) {
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
    componentDidUpdate = (prevProps: {countries: {total: number}}) => {
        if ( this.props.countries.total !== prevProps.countries.total ) {
            // get parity of the 1st country
            this.getParity(this.props.countries.first, "firstCountry")
            // same for the 2nd
            this.getParity(this.props.countries.second, "secondCountry")
        }
    }
    getParity = (data: { parity: { m: any[], f: any[], total: number }}, index: string) => {
        // parity state pattern
        const parity = {
            m: {
                amount: data.parity.m.length,
                percent:  Math.floor((data.parity.m.length / data.parity.total) * 100)
            },
            f: {
                amount: data.parity.f.length,
                percent: Math.floor((data.parity.f.length / data.parity.total) * 100)
            }
        }
        // update state with custom key
        const newState: any = {}
        newState[index] = { parity }
        this.setState({ ...newState })
    }
    setPercent = (amount: number, totalAmount: number) => Math.floor((amount / totalAmount) * 100);
    render() {
        return <section className="CompareParity Comparator__section">
            <h3 className="Comparator__subtitle">Parity</h3>
            <ParityTemplate
                country={this.state.firstCountry}
            />
            <ParityTemplate
                country={this.state.secondCountry}
            />
        </section>
    }
}
