import React, { Component, Fragment } from 'react';

import TlYear from './TlYear/TlYear';
import TlPrizes from './TlYear/TlPrizes/TlPrizes';
import TlCategory from './TlYear/TlPrizes/TlCategory/TlCategory';
import TlPriceWinner from './TlYear/TlPrizes/TlCategory/TlPriceWinner/TlPriceWinner'
// import Pop from './Pop/Pop'
import Nav from '../Nav/Nav';
import Compare from './../Compare/Compare';
import axios from 'axios';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svg: {
                w: 1000,
                h: 200
            },
            line: {
                inc: 12,
                multiplier: 60
            },
            dot: {
                inc: 10,
                hover: 10,
                scaleIn: 10,
                scaleOut: 5
            },
            rect: {
                scaleIn: 16,
                scaleOut: 8
            },
            infos: {

            },
            baseUrl: 'http://localhost:8000/api/',
            // 2 types of routes
            type: [
                'people',
                'prices'
            ],
            data: [],
            newData: {}
        }
        // total length of the timeline
        this.totalLength = 0;
        // array which'll contain the prize list 
        this.prizesArr = []
        // array which'll contain all categories
        this.CategoriesArr = []
        // array which'll contain all prize winners of a category
        this.prizeWinnersArr = [];
        // line position
        this.line = {
            x: 0,
            y: 0
        }
        // dot position
        this.dot = {
            x: this.line.x,
            y: 0
        }
        this.rect = {
            x: this.dot.x - 4,
            y: (this.state.svg.h - this.dot.y) - 4
        }

    }
    componentDidMount = () => {
        axios.get(this.state.baseUrl + this.state.type[1])
            .then(res => {
                this.setState({
                    data: res.data["hydra:member"]
                }, () => {
                    console.log(this.state.data)
                    const newData = {}
                    this.state.data.map((x, i) => {
                        
                        // if field exist in fields, increment it by 1
                        if (x.year in newData) {
                            const test = newData[x.year]
                            test.push(x.idpeople)
                            newData[x.year] = test
                        }
                        // else, set to 1
                        else newData[x.year] = [x.idpeople]
                    })
                    
                    
                    Object.keys(newData).map(key => {
                        let total = 0;
                        newData[key].map(x => total += x.length)
                        newData[key].total = total
                    });

                    this.setState({
                        newData
                    }, () => console.log(this.state.newData))
                })
            })
            .catch(err => console.error(err))
        
        this.setState({svg : { w: this.props.data.length * 10, h: 200}})
    } 
    
    // generation of price winners (dots)
    // generatePriceWinners = (parent, i, j) => parent.map((pricewinner, k) => {
    //     // update the cdot y position by one dot incrementation
    //     this.dot.y += this.state.dot.inc;
    //     // push a <TlPriceWinner/> for each price winner
    //     this.rect.x = this.dot.x - 4;
    //     this.rect.y = (this.state.svg.h - this.dot.y) - 4;
    //     return this.prizeWinnersArr.push(<TlPriceWinner 
    //         // unique key
    //         key={`${i}${j}${k}`} 
    //         // the content is a SVG circle
    //         content={pricewinner.data.gender ? <circle 
    //             className="dot" 
    //             // unique id
    //             data-id={`${i}${j}${k}`}
    //             // category
    //             data-age={pricewinner.data.age}
    //             data-coutry={pricewinner.data.coutry}
    //             data-field={pricewinner.data.field}
    //             data-gender={pricewinner.data.gender}
    //             // position
    //             cx={this.dot.x}
    //             cy={this.state.svg.h - this.dot.y}
    //             // rayon
    //             r={this.state.dot.scaleOut}
    //             // mouse events
    //             onMouseOver={(e) => this.dotMouseOver(e)}
    //             onMouseOut={(e) => this.dotMouseOut(e)}
    //         /> : <rect 
    //             className="dot" 
    //             // unique id
    //             data-id={`${i}${j}${k}`}
    //             // category
    //             data-age={pricewinner.data.age}
    //             data-coutry={pricewinner.data.coutry}
    //             data-field={pricewinner.data.field}
    //             data-gender={pricewinner.data.gender}
    //             width="8"
    //             height="8"
    //             x={this.rect.x}
    //             y={this.rect.y}
    //             onMouseOver={(e) => this.dotMouseOver(e)}
    //             onMouseOut={(e) => this.dotMouseOut(e)}
    //         />}
    //     />);
    // })
    // // generation of categories (<g><TlPrizeWinner/></g>)
    // generateCategories = (parent, i) => parent.prizeList.map((category, j) => {
    //     if (category.length !== 0) {
    //         // increment the total length with each prize winners in a category length
    //         this.totalLength += category.length;
    //         // update the dot y position by one dot incrementation, again
    //         this.dot.y += this.state.dot.inc;
    //         // reset the prize winners array
    //         this.prizeWinnersArr = [];
    //         // call the above method
    //         this.generatePriceWinners(category, i, j);
    //     }
    //     // push a <TlCategory/> for each category
    //     return this.CategoriesArr.push(category.length !== 0 ? <TlCategory
    //         // unique key & id
    //         key={`${i}${j}`}
    //         id={`${i}${j}`}
    //         // the content is all the <TlPriceWinner/>
    //         content={this.prizeWinnersArr}
    //     /> : null)
    // })
    // // generation of all the prizes (<g><TlCategory/></g>)
    generatePrizes = (parent, i) => {
        // reset the total length
        this.totalLength = 0;
        // every line, the line y position is incremented by a line incrementation
        this.line.x += this.state.line.inc;
        // reset the dots position
        this.dot.x = this.line.x;
        this.dot.y = 0;
        // reset the categories array
        this.CategoriesArr = [];
        // call the above method
        // this.generateCategories(parent, i)
        // reset the line y position
        this.line.y = this.state.svg.h - this.totalLength * this.state.line.multiplier;
        // push a <TlPrize/> for each prize
        this.prizesArr.push(<TlPrizes 
            // unique key & id
            key={i} 
            id={i}
            // the content is all the <TlCategory/>
            content={this.CategoriesArr}
        />)
    }
    // generation of all the timeline
    generateTimeline = () => Object.keys(this.state.newData).map((year, i) => {
        // reset the prizes array
        this.prizesArr = [];
        this.generatePrizes(year, i)
        return (
            // group all categories in a year
            <TlYear 
                // unique key & id
                key={i}
                data-id={i}
                year={year}
                // the content is the line & all the <TlPrizes/>
                content={<Fragment>
                    <line 
                        // unique od
                        data-id={i}
                        // position
                        x1={this.line.x} 
                        y1={this.line.y}
                        x2={this.line.x} 
                        y2={(15 - this.state.newData[year].total) * 10 + 10} 
                    />
                    {/* {this.prizesArr} */}
                </Fragment>}
            />
        )
    })
    resetTlParams = () => {
        // line position
        this.line = {
            x: 0,
            y: 0
        }
    }
    // dot mouse events
    dotMouse = (e, r, wh, mouse) => {
        // get the current element
        const elt = e.target

        this.setState({infos: {
            age: elt.dataset.age,
            country: elt.dataset.country,
            field: elt.dataset.field,
            gender: elt.dataset.gender,
        }});

        // get the NodeList of all <circles> and <rect>
        const nodeDots = elt.parentNode.parentNode.parentNode.querySelectorAll('.category');
        // init the final array
        const dots = [];
        // get all the dots
        Array.from(nodeDots).map(x => Array.from(x.childNodes).map(y => dots.push(y)));
        // if the element is a circle, set 'r' atribute
        if (elt.tagName === 'circle') elt.setAttribute('r', r);
        // else, set x, y, width & height attribute
        else {
            // update coords in terms of mouse in or out
            const getCoords = (e) => mouse ? (parseInt(elt.getAttribute(e)) - 4) : (parseInt(elt.getAttribute(e)) + 4);
            const rect = {
                x: getCoords('x'),
                y: getCoords('y'),
                width: wh,
                height: wh
            }
            // set all attributes
            for (const key in rect) elt.setAttribute(key, rect[key]);
        }
        // for all the dots
        Array.from(dots).map((x) => {
            // get the target id
            const targettedId = elt.dataset.id;
            // get the mapped id
            const mappedId = x.dataset.id;
            // get the y position of the mapped circle
            let circleY = parseInt(x.getAttribute('cy'))
            // get the y position of the mapped rect
            let rectY = parseInt(x.getAttribute('y'))
            // if the targetted dot is under the mapped dot
            if (targettedId > mappedId) {
                // if mouse is over, increment; if out, decrement
                mouse ? circleY += this.state.dot.hover : circleY -= this.state.dot.hover
                mouse ? rectY += this.state.dot.hover : rectY -= this.state.dot.hover;
            }
            // reverse logic
            else if (targettedId < mappedId) { 
                mouse ? circleY -= this.state.dot.hover : circleY += this.state.dot.hover
                mouse ? rectY -= this.state.dot.hover : rectY += this.state.dot.hover;
            }
            // set new y dot position, for circle & rect
            x.setAttribute('cy', circleY)
            x.setAttribute('y', rectY)   
            // document.querySelector('.Pop').style.opacity = mouse ? 1 : 0
            return null;   
        })
    }
    // when the mouse is on a dot
    dotMouseOver = (e) => this.dotMouse(e, this.state.dot.scaleIn, this.state.rect.scaleIn, 1);
    // when the mouse is over of a dot
    dotMouseOut = (e) => this.dotMouse(e, this.state.dot.scaleOut, this.state.rect.scaleOut, 0);
    render() {
        // render a svg with all child Components
        return <Fragment>
            <Nav/>
            <Compare/>
            <svg 
                id="Timeline"
                width={this.props.data.length * 20}
                height={this.state.svg.h}
            >
                {this.resetTlParams()}
                {this.generateTimeline()}
            </svg>
            {/* <Pop data={this.state.infos}/> */}
        </Fragment>
    }
}

export default Timeline;