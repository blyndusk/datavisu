import React, { Component } from 'react';

class Pop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
        }
    }

    stick = () => window.onmousemove = (e) => {
        this.setState({pos: {
            x: e.clientX + 10,
            y: e.clientY + 10
            
        }})
        // console.log(this.props.data)
    }

    componentDidMount = () => this.stick()

    render() {
        return <div className="Pop" style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}>
            <span></span>
            <span>Field: {this.props.data.field}</span>
            <span>Gender: {this.props.data.gender ? 'Man' : 'Woman'}</span>
        </div>;
    }
}

export default Pop;
