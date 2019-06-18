
import React from 'react';
import Nav from '../Nav/Nav'
import Brand from '../Brand/Brand'
import Compare from '../Compare/Compare'
import TimelinePop from './TimelinePop/TimelinePop'
import axios from 'axios';

interface P {}
interface S {
    baseUrl: string;
    // 2 types of API filters
    type: string[];
    data: {}[][],
    dates: string[];
    woman: {
        idcountry: {
            name: string
        },
        idpeople: number,
        firstname: string,
        name: string,
        idprice: [
            {
                year: number,
                idcategory: {
                    category: string
                }
            }
        ],
        birthday: string,
        deathdate: string
    };
    displayWomen: boolean;
    coords: {
        x: number,
        y: number
    }
}

export default class Timeline extends React.Component<P, S> {
    constructor(props: P) {
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
            woman: {
                idcountry: {
                    name: ''
                },
                idpeople: 0,
                firstname: '',
                name: '',
                idprice: [
                    {
                        year: 0,
                        idcategory: {
                            category: ''
                        }
                    }
                ],
                birthday: '',
                deathdate: ''
            },
            displayWomen: false,
            coords: { x: 0, y: 0 }
        }
    }
    componentDidMount = () => {
        axios.get(this.state.baseUrl + this.state.type[0])
            .then(res => {
                const response = res.data["hydra:member"];
                const womanData: any = [];
                const data: {}[][] = [[], [], [], [], [], []]
                response.map((people: { gender: string}) => people.gender === 'F' ? womanData.push(people) : null)
                womanData.map((woman: any) => {
                    const year: number = woman.idprice[0].year
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
    displayWomen = (e: { target: HTMLElement}) => {
        const pop = document.querySelector('.BrandNewPop') as HTMLElement;
        Array.from(document.querySelectorAll('.BrandNewTl__item')).map(child => child.classList.remove('BrandNewTl__item--active'));
        const parent = e.target.parentNode as HTMLElement;
        parent.classList.toggle('BrandNewTl__item--active') 
        if (pop) pop!.style.opacity = '0'
        document.querySelector('.BrandNewTl__tutorial')!.classList.add('BrandNewTl__tutorial--hidden')
    }
    displayWoman = (e: any, li: any) => {
        console.log(e.clientX, e.clientY)
        console.log(li)
        const pop = document.querySelector('.BrandNewPop') as HTMLElement;
        
        this.setState({
            woman: li,
            coords: {
                x: e.clientX > Math.floor(window.innerWidth * 1) ? Math.floor(window.innerWidth * 0.66) : e.clientX + 10,
                y: e.clientY > Math.floor(window.innerHeight * 1) ? Math.floor(window.innerHeight * 0.33) : e.clientY + 10
            }
        });
        if (pop) pop.style.opacity = '1';
    }
    render() {
        return <section className="BrandNewTl">
            <Brand />
            <Nav />
            <p className="BrandNewTl__context">We decided to focus on women, which are winning more and more prizes every year</p>
            <div className="BrandNewTl__items">
                {this.state.data.map((woman: any, i: number) => <div className="BrandNewTl__item" key={i}>
                    <div className="BrandNewTl__number" onClick={(e: any) => this.displayWomen(e)}>{woman.length}</div>
                    <div className="BrandNewTl__dates" onClick={(e: any) => this.displayWomen(e)}>{this.state.dates[i]}</div>
                    <ul className="BrandNewTl__laureats">
                        {woman.map((li: { idpeople: number }, i: number) => <li className="BrandNewTl__laureat" key={i} onClick={(e) => this.displayWoman(e, li)}>
                                <div className="BrandNewTl__image" style={{background: `url('./women/${li.idpeople}.jpg') no-repeat center/cover`}}></div>
                            </li>
                        )}
                    </ul>
                </div>)}
                <TimelinePop
                    data={this.state.woman}
                    coords={this.state.coords}
                />
            </div>
            <p className="BrandNewTl__tutorial">Select colored period to visualize laureats</p>
            <Compare />
        </section>
    }
}
