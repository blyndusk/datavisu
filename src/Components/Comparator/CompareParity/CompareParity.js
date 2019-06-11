
import React, { Component } from 'react';
import ParityTemplate from './ParityTemplate/ParityTemplate'

class CompareParity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgStyle: {},
            pathStyle: {},
            firstCountry: {
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
    componentWillReceiveProps() {
        // this.setState({ 
        //     firstCountry: this.props.firstCountryData
        // })
        // const parity = {
        //     m: {
        //         amount: this.props.firstCountryData.parity.m.length,
        //         percent: 0
        //     },
        //     f: {
        //         amount: 0,
        //         percent: 0
        //     }
        // }
        // console.log(this.props.firstCountryData.parity.m.length)
        // this.setState({
        //     firstCountry: {
        //         parity
        //     }
        // })
        this.getParity()
    }
    componentDidUpdate = (prevProps) => {

        if ( this.props.countries.total !==  prevProps.countries.total ) {
            console.log('defe')
             const setPercent = (gender, data) => Math.floor((gender.amount / data.length) * 100);
            const parity = {
                    m: {
                        amount: this.props.countries.first.parity.m.length,
                        percent:  Math.floor((this.props.countries.first.parity.m.length / this.props.countries.first.parity.total) * 100)
                    },
                    f: {
                        amount: this.props.countries.first.parity.f.length,
                        percent: Math.floor((this.props.countries.first.parity.f.length / this.props.countries.first.parity.total) * 100)
                    }
                }
            this.setState({
                firstCountry: {
                    parity
                }
            })
        }
        if (this.props.secondCountryData !== prevProps.secondCountryData) {

            // this.setState({secondCountry: {
            //     name: this.props.secondCountryData[0].idcountry.name
            // }})
            // this.setCountry(this.props.secondCountryData, 1)
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
        // console.log(this.props.firstCountryData.dude)
        // parity content amount of men & women, and percentage
        // const parity = {
        //     m: {
        //         amount: this.props.firstCountryData.m.length,
        //         percent: 0
        //     },
        //     f: {
        //         amount: 0,
        //         percent: 0
        //     }
        // }
        // set percent in terms of amount
       
        // this.setState({
        //     firstCountry: {
        //         parity
        //     }
        // })
        // map over all people in given data, and of people if man, increment m, else f
        
        // set percent for men & women
        
        // then, set parity to state
        // if (countrybin === 0) {
        //     parity.m.percent = setPercent(this.props.firstCountryData.m.length)
        // parity.f.percent = setPercent(this.props.firstCountryData.m.length)
        //     this.setState(prevState => {
        //         let firstCountry = Object.assign({}, prevState.firstCountry);
        //         firstCountry.parity = parity;
        //         return { firstCountry };
        //       })
        // }
        // if (countrybin === 1) {
        //     parity.m.percent = setPercent(this.props.secondCountryData.m.length)
        // parity.f.percent = setPercent(this.props.secondCountryData.m.length)
        //     this.setState(prevState => {
        //         let secondCountry = Object.assign({}, prevState.secondCountry);
        //         secondCountry.parity = parity;
        //         return { secondCountry };
        //       })
        // }
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
