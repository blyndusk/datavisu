import React, { Component } from 'react';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: []
        }
        // total length of the timelinex
        this.yearPosY = 0;
    }

    componentDidMount = () => {
        this.fetchData()
    }
    fetchData = () => {
        fetch('https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/2bfea3519938d430b8f922b064c2b54567ea87db/timeline.json')
        .then((fetched) => {
            return fetched.json();
        })
        .then((json) => {
            this.setState({timeline: json})
        }); 
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
                    // a person
                    const person = category[k].name;
                    // update the circle y postion by one unit
                    circlePos.y += 10;
                    // push a circle for each person
                    SVGPeopleSubGroup.push((<circle 
                        key={`${i}${j}${k}`}
                        data-label={j}
                        r="5" 
                        cx={circlePos.x}
                        cy={200 - circlePos.y}
                    >{person}</circle>));
                }
                // group all person in people
                SVGPeopleGroup.push(<g key={`${i}${j}`} className="peoples">{SVGPeopleSubGroup}</g>)
            }
            // group all people in a category
            SVGcategoryGroup.push(<g key={i} className="category">{SVGPeopleGroup}</g>)
            return (
                // group all categories in a year
                <g key={i} className="year">
                    {/* the line */}
                    <line  x1={this.yearPosY }  y1={200 - totalPeopleLength * 20} x2={this.yearPosY }  y2={200} onMouseEnter={() => this.mouseup(x.year)}/>
                    {/* circles */}
                    {SVGcategoryGroup}
                </g>
            )
        })
    mouseup = (year) => {
        console.log('yeyey')
        return <p>{year}</p>
    } 
    render() {
        return (
        <div className="Timeline">
            <svg  height="200" width="500">
                {this.getPrizesLength()}
            </svg>
        </div>
        );
    }
}

export default Timeline;