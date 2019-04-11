import React, { Component, Fragment } from 'react';

import TlYear from './TlYear/TlYear';
import TlPrizes from './TlYear/TlPrizes/TlPrizes';
import TlCategory from './TlYear/TlPrizes/TlCategory/TlCategory';
import TlPriceWinner from './TlYear/TlPrizes/TlCategory/TlPriceWinner/TlPriceWinner'

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: 'https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/c142eb72d344edbb1a9994a8a14e49c823784cfc/timeline.json',
            timeline: [],
            svg: {
                w: 500,
                h: 200
            },
            year: {
                inc: 20
            },
            line: {
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
        this.CategoryArr = []
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
        fetch(this.state.json)
        .then(fetched => fetched.json())
        .then(json => this.setState({timeline: json}))
        .catch(error => console.log(error))
    }
    generatePriceWinners = (parent, i, j) => parent.map((pricewinner, k) => {
        // update the circle y postion by one unit
        this.dot.y += this.state.dot.inc;
        // push a circle for each person
        return this.prizeWinnersArr.push(<TlPriceWinner 
            key={`${i}${j}${k}`} 
            content={
            <circle 
                className="dot" 
                data-id={`${i}${j}${k}`}
                data-category={pricewinner.category}
                cx={this.dot.x}
                r="5"
                cy={this.state.svg.h - this.dot.y}
                onMouseOver={(e) => this.circleMouseOver(e)}
                onMouseOut={(e) => this.circleMouseOut(e)}
            />
        }/>);
    })
    generateCategories = (parent, i) => parent.prizesList.map((category, j) => {
        // increment the total length with each length
        this.totalLength += category.length;
        // update the circle y postion by one unit
        this.dot.y += this.state.dot.inc;
        // init a subgroup array to staock all people
        this.prizeWinnersArr = [];
        // for every people in a category
        this.generatePriceWinners(category, i, j)
        // group all person in people
        return this.CategoryArr.push(<TlCategory
            key={`${i}${j}`}
            id={`${i}${j}`}
            content={this.prizeWinnersArr}
        />)
    })
    generatePrizes = (parent, i) => {
        // every year, yearPosY is incremented by 20
        this.line.x += this.state.year.inc;
        // total length of poeple in a specific year
        // rendered array, which'll contain people in a category
        this.prizesArr = [];
        // rendered array, which'll contain a person for a nobel prize
        this.CategoryArr = [];
        this.dot.x = this.line.x;
        this.dot.y = 0;
        this.totalLength = 0;
        
        // for all categories in a year
        this.generateCategories(parent, i)

        this.line.y = this.state.svg.h - this.totalLength * this.state.line.multiplier;
        // group all people in a category
        this.prizesArr.push(<TlPrizes 
            key={i} 
            id={i}
            content={this.CategoryArr}
        />)
    }
    generateYears = () => this.state.timeline.map((year, i) => {
            this.generatePrizes(year, i)
            return (
                // group all categories in a year
                <TlYear 
                    key={i}
                    data-id={i}
                    content={
                        <Fragment>
                            <line 
                                data-id={i}
                                x1={this.line.x} 
                                y1={this.line.y}
                                x2={this.line.x} 
                                y2={this.state.svg.h} 
                            />
                            {this.prizesArr}
                        </Fragment>
                    }
                />
            )
        })
    circleMouse = (e, r, mouse) => {
        const elt = e.target
        const circles = elt.parentNode.parentNode.parentNode.querySelectorAll('circle');
        elt.setAttribute('r', r)
        Array.from(circles).map((x) => {
            const targetId = elt.dataset.id;
            const currentId = x.dataset.id;
            let cy = parseInt(x.getAttribute('cy'))
            if (mouse === 1) {
                if ( targetId > currentId) cy += this.state.dot.othersDotsPosition;
                else if (targetId < currentId) cy -= this.state.dot.othersDotsPosition;
            }
            else if (mouse === 0) {
                if ( targetId < currentId) cy += this.state.dot.othersDotsPosition;
                else if (targetId > currentId) cy -= this.state.dot.othersDotsPosition;
            }
            return x.setAttribute('cy', cy)
        })
    }
    circleMouseOver = (e) => this.circleMouse(e, this.state.dot.scaleIn, 1);
    circleMouseOut = (e) => this.circleMouse(e, this.state.dot.scaleOut, 0);
    render() {
        return <svg 
            id="Timeline"
            width={this.state.svg.w}
            height={this.state.svg.h}
        >
            {this.generateYears()}
        </svg>;
    }
}


export default Timeline;