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
            y: e.clientY - 100
            
        }})
    }

    componentDidMount = () => this.stick()

    render() {
        return <div className="Pop" style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}>
            <p>Age: <span>{this.props.data.age}</span></p>
            <p>Field: <span>{this.props.data.field}</span></p>
            <p>Gender: <span>{parseInt(this.props.data.gender) ===  1 ? 'Woman' : 'Man'}</span></p>
        </div>;
    }
}

export default Pop;
