import React, { Component, Fragment } from 'react';

import TlYear from './TlYear/TlYear';
import TlPrizes from './TlYear/TlPrizes/TlPrizes';
import TlCategory from './TlYear/TlPrizes/TlCategory/TlCategory';
import TlPriceWinner from './TlYear/TlPrizes/TlCategory/TlPriceWinner/TlPriceWinner'
import { generateData } from '../../data/data';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: 'https://trash.a-dll.com/tl.json',
            timeline: [],
            timeline2: generateData(),
            svg: {
                w: 500,
                h: 400
            },
            line: {
                inc: 20,
                multiplier: 20
            },
            dot: {
                inc: 10,
                othersDotsPosition: 10,
                scaleIn: 10,
                scaleOut: 5
            }
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
    }
    // fetch the data when the component mounting
    UNSAFE_componentWillMount = () => this.fetchData();
    fetchData = () => {
        // fetch(this.state.json2, {mode: 'no-cors'})
        // .then(fetched => fetched.json())
        // .then(json => this.setState({timeline: json}))
        // .catch(error => console.log(error))
        console.log(this.state.timeline2)
    }
    // generation of price winners (dots)
    generatePriceWinners = (parent, i, j) => parent.map((pricewinner, k) => {
        // update the cdot y position by one dot incrementation
        this.dot.y += this.state.dot.inc;
        // push a <TlPriceWinner/> for each price winner
        let rectPosX = this.dot.x - 4;
        let rectPosY = (this.state.svg.h - this.dot.y) - 4;
        return this.prizeWinnersArr.push(<TlPriceWinner 
            // unique key
            key={`${i}${j}${k}`} 
            // the content is a SVG circle
            content={pricewinner.data.gender ? <circle 
                className="dot" 
                // unique id
                data-id={`${i}${j}${k}`}
                // category
                data-category={pricewinner.data.field}
                // position
                cx={this.dot.x}
                cy={this.state.svg.h - this.dot.y}
                // rayon
                r={this.state.dot.scaleOut}
                // mouse events
                onMouseOver={(e) => this.dotMouseOver(e)}
                onMouseOut={(e) => this.dotMouseOut(e)}
            /> : <rect 
                width="8"
                height="8"
                x={rectPosX}
                y={rectPosY}

                className="dot" 
                // unique id
                data-id={`${i}${j}${k}`}
                // category
                data-category={pricewinner.data.field}
            />}
        />);
    })
    // generation of categories (<g><TlPrizeWinner/></g>)
    generateCategories = (parent, i) => parent.prizeList.map((category, j) => {
        if (category.length !== 0) {
            // increment the total length with each prize winners in a category length
            this.totalLength += category.length;
            // update the dot y position by one dot incrementation, again
            this.dot.y += this.state.dot.inc;
            // reset the prize winners array
            this.prizeWinnersArr = [];
            // call the above method
            this.generatePriceWinners(category, i, j);
        }
        // push a <TlCategory/> for each category
        return this.CategoriesArr.push(category.length !== 0 ? <TlCategory
            // unique key & id
            key={`${i}${j}`}
            id={`${i}${j}`}
            // the content is all the <TlPriceWinner/>
            content={this.prizeWinnersArr}
        /> : null)
    })
    // generation of all the prizes (<g><TlCategory/></g>)
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
        this.generateCategories(parent, i)
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
    generateTimeline = () => this.state.timeline2.map((year, i) => {
        // reset the prizes array
        this.prizesArr = [];
        this.generatePrizes(year, i)
        return (
            // group all categories in a year
            <TlYear 
                // unique key & id
                key={i}
                data-id={i}
                year={year.year}
                // the content is the line & all the <TlPrizes/>
                content={<Fragment>
                    <line 
                        // unique od
                        data-id={i}
                        // position
                        x1={this.line.x} 
                        y1={this.line.y}
                        x2={this.line.x} 
                        y2={this.state.svg.h} 
                    />
                    {this.prizesArr}
                </Fragment>}
            />
        )
    })
    // dot mouse events
    dotMouse = (e, r, mouse) => {
        // get the current element
        const elt = e.target
        // get all the dots
        const dots = elt.parentNode.parentNode.parentNode.querySelectorAll('circle');
        // set the scale
        elt.setAttribute('r', r)
        // for all the dots
        Array.from(dots).map((x) => {
            // get the target id
            const targettedId = elt.dataset.id;
            // get the mapped id
            const mappedId = x.dataset.id;
            // get the y position of the mapped dot
            let cy = parseInt(x.getAttribute('cy'))
            // 1 = over; 0 = out
            if (mouse === 1) {
                // if the targeted is bigger than the mapped id, increment by the dot pos
                if ( targettedId > mappedId) cy += this.state.dot.othersDotsPosition;
                // else if the targeted is bigger than the mapped id, decrement by the dot pos
                else if (targettedId < mappedId) cy -= this.state.dot.othersDotsPosition;
            }
            // if the mouse is out, reverse logic
            else if (mouse === 0) {
                if ( targettedId < mappedId) cy += this.state.dot.othersDotsPosition;
                else if (targettedId > mappedId) cy -= this.state.dot.othersDotsPosition;
            }
            // set new y dot position
            return x.setAttribute('cy', cy)
        })
    }
    // when the mouse is on a dot
    dotMouseOver = (e) => this.dotMouse(e, this.state.dot.scaleIn, 1);
    // when the mouse is over of a dot
    dotMouseOut = (e) => this.dotMouse(e, this.state.dot.scaleOut, 0);
    render() {
        // render a svg with all child Components
        return <svg 
            id="Timeline"
            width={this.state.svg.w}
            height={this.state.svg.h}
        >
            {this.generateTimeline()}
        </svg>;
    }
}

export default Timeline;