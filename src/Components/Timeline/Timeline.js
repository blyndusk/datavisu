import React, { Component, Fragment } from 'react';

class Year extends Component {
    render() {
        return (
            <g className="year" data-id={this.props.id}>
                {this.props.content}
            </g>
        );
    }
}
class PrizesList extends Component {
    render() {
        return (
            <g className="prizesList" data-id={this.props.id}>
                {this.props.content}
            </g>
        );
    }
}
class Category extends Component {
    render() {
        return (
            <g className="category" data-id={this.props.id}>
                {this.props.content}
            </g>
        );
    }
}

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
        fetch('https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/208d26ee8a552ecf2dea727f8ecefa41b47582f8/timeline.json')
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
                    SVGPeopleSubGroup.push(<circle 
                        className="people"
                        key={`${i}${j}${k}`}
                        data-id={`${i}${j}${k}`}
                        data-label={j}
                        r="5"
                        onMouseOver={(e) => this.circleMouseOver(e)}
                        onMouseOut={(e) => this.circleMouseOut(e)}
                        cx={circlePos.x}
                        cy={200 - circlePos.y}/>);
                }
                // group all person in people
                SVGPeopleGroup.push(<Category
                    key={`${i}${j}`}
                    id={`${i}${j}`}
                    content={SVGPeopleSubGroup}
                />)
            }
            // group all people in a category
            SVGcategoryGroup.push(<PrizesList 
                key={i} 
                id={i}
                content={SVGPeopleGroup}
            />)
            return (
                // group all categories in a year
                <Year 
                    key={i}
                    content={
                        <g 
                            data-id={i}
                            className="lineNPeople">
                            <line 
                                data-id={i}
                                x1={this.yearPosY} 
                                y1={200 - totalPeopleLength * 20}
                                x2={this.yearPosY} 
                                y2={200} 
                            />
                            {SVGcategoryGroup}
                        </g>
                    }
                />
            )
        })
    circleMouseOver = (e) => {
        const elt = e.target
        const circles = elt.parentNode.parentNode.parentNode.querySelectorAll('circle');
        elt.setAttribute('r', '10')
        Array.from(circles).map((x) => {
            const targetId = elt.dataset.id;
            const currentId = x.dataset.id;
            let cy = parseInt(x.getAttribute('cy'))
            if ( targetId > currentId) cy += 10;
            else if (targetId < currentId) cy -= 10;
            return x.setAttribute('cy', `${cy}`)
        })
    }
    circleMouseOut = (e) => {
        const elt = e.target
        const circles = elt.parentNode.parentNode.parentNode.querySelectorAll('circle');
        elt.setAttribute('r', '5')
        Array.from(circles).map((x) => {
            const targetId = elt.dataset.id;
            const currentId = x.dataset.id;
            let cy = parseInt(x.getAttribute('cy'))
            if ( targetId < currentId) cy += 10;
            else if (targetId > currentId) cy -= 10;
            return x.setAttribute('cy', `${cy}`)
        })
    }
    render() {
        return (
            <Fragment>
                <div className="Timeline">
                    <svg  height="200" width="500">
                        {this.getPrizesLength()}
                    </svg>
                </div>
            </Fragment>
        );
    }
}


export default Timeline;