
import React, { Component } from 'react';
import ParityTemplate from './ParityTemplate/ParityTemplate'

class CompareParity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgStyle: {},
            pathStyle: {},
            firstCountry: {
                name: '',
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
            },
            secondCountry: {
                name: '',
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
        if (this.props.firstCountryData !== prevProps.firstCountryData ) {
            this.setState({firstCountry: {
                name: this.props.firstCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.firstCountryData, 0)
            
        }
        if (this.props.secondCountryData !== prevProps.secondCountryData) {
            this.setState({secondCountry: {
                name: this.props.secondCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.secondCountryData, 1)
        }
    }
    setName = (countrybin) => {
        if (countrybin === 0) this.setState({firstCountry: {
            name: this.props.firstCountryData[0].idcountry.name
        }})
        else if (countrybin === 1) this.setState({secondCountry: {
            name: this.props.firstCountryData[0].idcountry.name
        }})
    }
    setCountry = (data, countrybin) => {
        this.getParity(data, countrybin);
    }
    getParity = (data, countrybin) => {
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
        if (countrybin === 0) {
            this.setState(prevState => {
                let firstCountry = Object.assign({}, prevState.firstCountry);
                firstCountry.parity = parity;
                return { firstCountry };
              })
        }
        if (countrybin === 1) {
            this.setState(prevState => {
                let secondCountry = Object.assign({}, prevState.secondCountry);
                secondCountry.parity = parity;
                return { secondCountry };
              })
        }
    }
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
