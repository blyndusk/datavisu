
import React, { Component } from 'react';

class MapPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
        }
    }

    displayPop = () => {

        document.querySelector('.Map svg').onclick = (e) => {
            [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => document.querySelector('.MapPop').style.opacity = 1));
            this.setState({pos: {
                x: e.clientX + 10,
                y: e.clientY + 10
            }})
        }
        
    }
    componentDidMount = () => this.displayPop()
    render() {
        return <section 
            className="MapPop"
            style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}
        >
            <h3 className="country">DEFAULT_COUNTRY</h3>
            <ul className="fields">
                <li>Physics: <span>{}</span></li>
                <li>Chemistry: <span>{}</span></li>
                <li>Medecine: <span>{}</span></li>
                <li>Litterature: <span>{}</span></li>
                <li>Peace: <span>{}</span></li>
                <li>Economics: <span>{}</span></li>
            </ul>
            <div className="parity"></div>
            <div className="universities">
                <h4>Top universities</h4>
                <ul>
                    <li>1. <span>DEFAULT_UNIVERSITY_1</span><span></span></li>
                    <li>2. <span>DEFAULT_UNIVERSITY_2</span><span></span></li>
                    <li>3. <span>DEFAULT_UNIVERSITY_3</span><span></span></li>
                </ul>
            </div>
            <div className="age">
                <span></span>
                <span></span>
            </div>
            
        </section>
    }
}

export default MapPop;