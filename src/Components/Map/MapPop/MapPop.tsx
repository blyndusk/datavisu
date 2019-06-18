
import React, { Fragment } from 'react';

interface P {
    country: string;
    data: [{
        idprice: [{
            idcategory: {
                category: string;
            };
        }];
        idcountry: {
            name: string;
        };
        idaffiliation: {
            address: string;
        };
        gender: string;
    }];
    fieldCode: string;
}

interface S {
    pos: {
        x: number,
        y: number,
    };
    fields: any;
    universities: {};
    sortedUniversities: any[];
    parity: {
        m: {
            amount: number,
            percent: number,
        },
        f: {
            amount: number,
            percent: number,
        },
    };
    ageAverage: number;
    svgStyle: {};
    pathStyle: {};
}

export default class MapPop extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            ageAverage: 0,
            fields: {},
            parity: {
                f: {
                    amount: 0,
                    percent: 0,
                },
                m: {
                    amount: 0,
                    percent: 0,
                },
            },
            pathStyle: {},
            pos: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            },
            sortedUniversities: [],
            svgStyle: {},
            universities: {},
        };
    }
    UNSAFE_componentWillMount = () => this.setState({pos: { x: 0, y: 0}});
    componentDidMount = () => this.displayPop();
    componentDidUpdate = (prevProps: any, prevState: any) => {
        if (this.props.data !== prevProps.data) this.getParsedData();
        if (this.state.parity !== prevState.parity) {
            this.setPercentage(25, this.state.parity.f.percent / 100);
            this.setRotation(this.state.parity.f.percent / 100);
        }
    }
    getParsedData = () => {
        this.getFieldsAmount(this.props.data);
        this.getParity(this.props.data);
        this.getAverageAge(this.props.data);
        this.getuniversities(this.props.data);
    }
    displayPop = () => {
        const map = document.querySelector('.Map');
        const DOMMapPop = document.querySelector('.MapPop') as HTMLElement;
        Array.from(map!.childNodes).map((child: any) => {
            if (child.tagName  === 'svg') {
                child.addEventListener('click', (e: any) => {
                    e.stopPropagation();
                    DOMMapPop.style.opacity = '0';
                });
                [...child.childNodes].map(grandchild => {
                    if (grandchild.tagName === 'g') grandchild.addEventListener('click', (e: any) => {
                        e.stopPropagation();
                        this.setState({pos: {
                            x: e.clientX > Math.floor(window.innerWidth * 0.66) ? Math.floor(window.innerWidth * 0.66) : e.clientX + 10,
                            y: e.clientY > Math.floor(window.innerHeight * 0.33) ? Math.floor(window.innerHeight * 0.33) : e.clientY + 10,
                        }});
                        setTimeout(() => DOMMapPop.style.opacity = '1', 200);
                    });
                    else grandchild.addEventListener('click', (e: any) => {
                        e.stopPropagation();
                        DOMMapPop.style.opacity = '0';
                    });
                    return grandchild;
                });
            }
            return child;
        });
    }
    // method to get field for reach price
    getFieldsAmount = (data: [{idprice: [{idcategory: {category: string}}]}]) => {
        // fields is an object which contain fields with amounts of prize for each field
        const fields: any = {
            chemistry: 0,
            economics: 0,
            literature: 0,
            medicine: 0,
            peace: 0,
            physics: 0,
        };
        // map over all given data, and over each prize of each people
        data.map(people => people.idprice.map(price => {
            // get field of price
            const field: string = price.idcategory.category;
            // if field exist in fields, increment it by 1
            if (field in fields) fields[field]++;
            // else, set to 1
            else fields[field] = 1;
            return field;
        }));
        // then, set fields to state
        // this.setState({fields})
        this.setState({ fields,
        });
    }
    // method to get percentage of M/W for each people
    getParity = (data: [{gender: string}]) => {
        // parity content amount of men & women, and percentage
        const parity = {
            f: {
                amount: 0,
                percent: 0,
            },
            m: {
                amount: 0,
                percent: 0,
            },
        };
        // set percent in terms of amount
        const setPercent = (gender: {amount: number}) => Math.floor((gender.amount / data.length) * 100);
        // map over all people in given data, and of people if man, increment m, else f
        data.map((people: {gender: string}) => people.gender === 'M' ? parity.m.amount++ : parity.f.amount++);
        // set percent for men & women
        parity.m.percent = setPercent(parity.m);
        parity.f.percent = setPercent(parity.f);
        // then, set parity to state
        this.setState({ parity });
    }
    // method ot get average age of all people
    getAverageAge = (data: any) => {
        const dataLength: number = data.length;
        // total age begins to 0
        let ageTotal: number = 0;
        // map over all given data
        data.map((people: {birthday: string, idprice: any[]}) => {
            // if people birthday && people's first price's year exist, increment total age with people age
            if (people.birthday && people.idprice[0].year) {
                ageTotal = ageTotal + parseInt(people.idprice[0].year) - parseInt(people.birthday.replace(/-\w+|:\w+|\+\w+/g, ''));
            }
            return ageTotal;
        });
        // then, set age average to state, doing the average
        this.setState({ageAverage: Math.floor(ageTotal / dataLength)});
    }
    getuniversities = (data: [{idaffiliation: {address: string}}]) => {
        const universities: any = {};
        // map over all given data, and over each prize of each people
        data.map(people => {
            // get field of price
            let university;
            if (people.idaffiliation) university = people.idaffiliation.address;
            if (university !== undefined) {
                // if university exist in universities, increment it by 1
                if (university in universities) universities[university]++;
                // else, set to 1
                else universities[university] = 1;
            }
            return university;
        });
        let sortedUniversities: any[] = [];
        for (const university in universities) sortedUniversities.push([university, universities[university]]);
        sortedUniversities.sort((a, b) => b[1] - a[1]);
        sortedUniversities = sortedUniversities.splice(0, 3);
        this.setState({
            sortedUniversities,
            universities: {...universities},
        });
    }
    setRotation = (percentage: number) => {

        this.setState({svgStyle: {
            transform: `rotate(${- 360 * percentage / 2}deg)`},
        });
    }
    setPercentage = (rayon: number, percentage: number) => {
        const perimeter = Math.PI * 2 * rayon;

        this.setState({pathStyle: {
            strokeDasharray: `${perimeter * percentage}, ${perimeter}`},
        });
    }
    render() {
        return <section
            className='MapPop'
            style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}
        >
            {this.props.data.length ? <Fragment>
            <h3 className='MapPop__country'>{this.props.data[0].idcountry.name.toUpperCase()}</h3>

            <div className='MapPop__laureats'>
                <span>{this.props.data.length}</span>
                <span>Laureats</span>
            </div>

           {!this.props.fieldCode.length ? <ul className='MapPop__fields'>
                {Object.keys(this.state.fields).map(key =>
                    <li className='MapPop__field' key={key}>
                        <span>{this.state.fields[key]}</span>
                        <span>{key}</span>
                    </li>,
                ) }
            </ul> : null }

            <div className='MapPop__parity'>
                <div className='MapPop__gender'>
                    <span>{this.state.parity.m.percent}%</span>
                    <span>Men</span>
                </div>
                <svg className='MapPop__circle' xmlns='http://www.w3.org/2000/svg' style={this.state.svgStyle}>
                    <circle className='MapPop__jauge MapPop__jauge--men' cy='34' cx='34' r='25'/>
                    <circle className='MapPop__jauge MapPop__jauge--women' style={this.state.pathStyle} cy='34' cx='34' r='25'/>
                </svg>
                <div className='MapPop__gender'>
                    <span>{this.state.parity.f.percent}%</span>
                    <span>Women</span>
                </div>
            </div>
            {this.state.sortedUniversities.length ? <div className='MapPop__top'>
               <h4 className='MapPop__subtitle'>Top universities</h4>
               <ul className='MapPop__universities'>
                   {this.state.sortedUniversities.map((university, i) =>
                       <li className='MapPop__university' key={university[0]}>
                           <span>{i + 1}. {university[0]}</span>
                           <span>{university[1]}</span>
                       </li>,
                   )}
               </ul>
            </div> : null}
            <div className='MapPop__age'>
                <span>{this.state.ageAverage}</span>
                <span>Average age</span>
            </div>
            </Fragment> : null
            }
        </section>;
    }
}
