
import React, { Component } from 'react';

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
    componentDidMount = () => {
        this.setPercentage(75, 0.2);
        this.setRotation(0.2)
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log('change frist')
        if (this.props.firstCountryData !== prevProps.firstCountryData ) {
            console.log('change frist')
            this.setState({firstCountry: {
                name: this.props.firstCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.firstCountryData, 0)
            
        }
        if (this.props.secondCountryData !== prevProps.secondCountryData) {
            console.log('change seco,d')
            this.setState({secondCountry: {
                name: this.props.secondCountryData[0].idcountry.name
            }})
            this.setCountry(this.props.secondCountryData, 1)
            
        }

    }
    setName = (countrybin) => {
        if (countrybin === 0) {
            this.setState({firstCountry: {
                name: this.props.firstCountryData[0].idcountry.name
            }})
        }
        else {
            this.setState({secondCountry: {
                name: this.props.firstCountryData[0].idcountry.name
            }})
        }
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
    setRotation = (percentage) => {
        this.setState({svgStyle: {
            transform: `rotate(${- 360 * percentage / 2}deg)`},
        })
    }
    setPercentage = (rayon, percentage) => {
        const perimeter = Math.PI * 2 * rayon;
        this.setState({pathStyle: {
            strokeDasharray: `${perimeter * percentage}, ${perimeter}`},
        })
    }
    render() {
        return <section className="CompareParity">   
           <div className="first">
           <h2>{this.state.firstCountry.name}</h2>
           <span>men: {this.state.firstCountry.parity.m.amount} - women: {this.state.firstCountry.parity.f.amount}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="200" style={this.state.svgStyle}>
                <circle className="men" cy="100" cx="100" r="75"></circle>
                <circle style={this.state.pathStyle} className="women" cy="100" cx="100" r="75"></circle>
            </svg>
           </div>
           <div className="second">
           <h2>{this.state.secondCountry.name}</h2>
           <span>men: {this.state.secondCountry.parity.m.amount} - women: {this.state.secondCountry.parity.f.amount}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="200" style={this.state.svgStyle}>
                <circle className="men" cy="100" cx="100" r="75"></circle>
                <circle style={this.state.pathStyle} className="women" cy="100" cx="100" r="75"></circle>
            </svg>
           </div>
        </section>
    }
}

export default CompareParity;
