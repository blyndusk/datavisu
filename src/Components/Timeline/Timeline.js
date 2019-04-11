import TlYear from './TlYear/TlYear';
import TlPrizesList from './TlYear/TlPrizesList/TlPrizesList';
import TlCategory from './TlYear/TlPrizesList/TlCategory/TlCategory';
import TlDot from './TlYear/TlPrizesList/TlCategory/TlDot/TlDot';

import React, { Component, Fragment } from 'react';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: []
        }
        // total length of the timelinex
        this.yearPosY = 0;
    }
    componentDidMount = () => this.fetchData();
    fetchData = () => {
        fetch('https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/208d26ee8a552ecf2dea727f8ecefa41b47582f8/timeline.json')
        .then(fetched => fetched.json())
        .then(json => this.setState({timeline: json})); 
    }
    getPrizesLength = () => this.state.timeline.map((x, i) => {
            // every year, yearPosY is incremented by 20
            this.yearPosY += 20;
            // total length of poeple in a specific year
            let totalPeopleLength = 0;
            // rendered array, which'll contain people in a category
            const SVGcategoryGroup = [];
            // rendered array, which'll contain a person for a nobel prize
            const SVGPeopleGroup = [];
            // SVG circles position
            let circlePos= {
                x: this.yearPosY,
                y: -10
            };
            // for all categories in a year
            for (let j = 0; j < x.categories.length; j++) {
                // a category
                const category = x.categories[j];
                // increment the total length with each length
                totalPeopleLength += category.length;
                // update the circle y postion by one unit
                circlePos.y += 10;
                // init a subgroup array to staock all people
                const SVGPeopleSubGroup = [];
                // for every people in a category
                for (let k = 0; k < category.length; k++) {
                    // update the circle y postion by one unit
                    circlePos.y += 10;
                    // push a circle for each person
                    SVGPeopleSubGroup.push(<TlDot 
                        key={`${i}${j}${k}`} 
                        content={
                        <circle 
                            className="dot" 
                            data-id={`${i}${j}${k}`}
                            data-label={j}
                            cx={circlePos.x}
                            r="5"
                            cy={200 - circlePos.y}
                            onMouseOver={(e) => this.circleMouseOver(e)}
                            onMouseOut={(e) => this.circleMouseOut(e)}
                        />
                    }/>);
                }
                // group all person in people
                SVGPeopleGroup.push(<TlCategory
                    key={`${i}${j}`}
                    id={`${i}${j}`}
                    content={SVGPeopleSubGroup}
                />)
            }
            // group all people in a category
            SVGcategoryGroup.push(<TlPrizesList 
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
                                y1={200 - totalPeopleLength * 20}
                                x2={this.yearPosY} 
                                y2={200} 
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
                if ( targetId > currentId) cy += 10;
                else if (targetId < currentId) cy -= 10;
            }
            else if (mouse === 0) {
                if ( targetId < currentId) cy += 10;
                else if (targetId > currentId) cy -= 10;
            }
            return x.setAttribute('cy', cy)
        })
    }
    circleMouseOver = (e) => this.circleMouse(e, 10, 1);
    circleMouseOut = (e) => this.circleMouse(e, 5, 0);
    render() {
        return <svg 
            id="Timeline"
            height="200"
            width="500"
        >
            {this.getPrizesLength()}
        </svg>;
    }
}


export default Timeline;