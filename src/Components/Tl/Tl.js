import React, { Component, Fragment } from 'react';

import TlYear from './TlYear/TlYear';
import TlPrizes from './TlYear/TlPrizes/TlPrizes';
import TlCategory from './TlYear/TlPrizes/TlCategory/TlCategory';
import TlPriceWinner from './TlYear/TlPrizes/TlCategory/TlPriceWinner/TlPriceWinner'

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: 'https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/e1b9fdd086530e370775d95351019e4c1c6a2db8/timeline.json',
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
            circle: {
                inc: 10,
                hover: 10,
                scale0: 5,
                scale1: 10
            }
        }
        // total length of the timelinex
        this.yearPosY = 0;
    }
    componentDidMount = () => this.fetchData();
    fetchData = () => {
        fetch(this.state.json)
        .then(fetched => fetched.json())
        .then(json => this.setState({timeline: json}))
        .catch(error => console.log(error))
    }
    generate = () => this.state.timeline.map((year, i) => {
            // every year, yearPosY is incremented by 20
            this.yearPosY += this.state.year.inc;
            // total length of poeple in a specific year
            let totalPeopleLength = 0;
            // rendered array, which'll contain people in a category
            const SVGcategoryGroup = [];
            // rendered array, which'll contain a person for a nobel prize
            const SVGPeopleGroup = [];
            // SVG circles position
            let circlePos= {
                x: this.yearPosY,
                y: 0
            };
            // for all categories in a year
            year.prizesList.map((category, j) => {
                // increment the total length with each length
                totalPeopleLength += category.length;
                // update the circle y postion by one unit
                circlePos.y += this.state.circle.inc;
                // init a subgroup array to staock all people
                const SVGPeopleSubGroup = [];
                // for every people in a category
                category.map((pricewinner, k) => {
                    console.log(pricewinner)
                    // update the circle y postion by one unit
                    circlePos.y += this.state.circle.inc;
                    // push a circle for each person
                    return SVGPeopleSubGroup.push(<TlPriceWinner 
                        key={`${i}${j}${k}`} 
                        content={
                        <circle 
                            className="dot" 
                            data-id={`${i}${j}${k}`}
                            data-label={pricewinner.category}
                            cx={circlePos.x}
                            r="5"
                            cy={this.state.svg.h - circlePos.y}
                            onMouseOver={(e) => this.circleMouseOver(e)}
                            onMouseOut={(e) => this.circleMouseOut(e)}
                        />
                    }/>);
                })
                // group all person in people
                return SVGPeopleGroup.push(<TlCategory
                    key={`${i}${j}`}
                    id={`${i}${j}`}
                    content={SVGPeopleSubGroup}
                />)
            })
            // group all people in a category
            SVGcategoryGroup.push(<TlPrizes 
                key={i} 
                id={i}
                content={SVGPeopleGroup}
            />)
            return (
                // group all categories in a year
                <TlYear 
                    key={i}
                    data-id={i}
                    content={
                        <Fragment>
                            <line 
                                data-id={i}
                                x1={this.yearPosY} 
                                y1={this.state.svg.h - totalPeopleLength * this.state.line.multiplier}
                                x2={this.yearPosY} 
                                y2={this.state.svg.h} 
                            />
                            {SVGcategoryGroup}
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
                if ( targetId > currentId) cy += this.state.circle.hover;
                else if (targetId < currentId) cy -= this.state.circle.hover;
            }
            else if (mouse === 0) {
                if ( targetId < currentId) cy += this.state.circle.hover;
                else if (targetId > currentId) cy -= this.state.circle.hover;
            }
            return x.setAttribute('cy', cy)
        })
    }
    circleMouseOver = (e) => this.circleMouse(e, this.state.circle.scale1, 1);
    circleMouseOut = (e) => this.circleMouse(e, this.state.circle.scale0, 0);
    render() {
        return <svg 
            id="Timeline"
            width={this.state.svg.w}
            height={this.state.svg.h}
        >
            {this.generate()}
        </svg>;
    }
}


export default Timeline;