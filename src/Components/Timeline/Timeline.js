import React, { Component } from 'react';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: []
        }
        this.xpos = 0;
    }

    componentDidMount = () => {
        this.fetchData()
    }
    fetchData = () => {
        fetch('https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/394da74bb7244563b84017a0c9fba2f231a7b22c/timeline.json')
        .then((fetched) => {
            return fetched.json();
        })
        .then((json) => {
            this.setState({timeline: json})
        }); 
    }
    getPrizesLength = (x, i) => this.state.timeline.map((x, i) => {
            let lgh = 0
            for (let j = 0; j < x.categories.length; j++) {
                const y = x.categories[j];
                lgh += y.length;
            }
            this.xpos+=20
            console.log(lgh)
            return <line key={i} x1={this.xpos} y1={200 - lgh * 10} x2={this.xpos} y2={200}/>
        })
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
