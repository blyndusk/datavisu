
import React, { Component } from 'react';

class MapPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            },
            parity: {}
        }
    }

    displayPop = () => {
        console.log(this.props.data)
        document.querySelector('.Map svg').addEventListener('click', (e) => {
            [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('click', () => document.querySelector('.MapPop').style.opacity = 1));
            this.setState({pos: {
                x: e.clientX + 10,
                y: e.clientY + 10
            }})
        })        
    }
    getFieldsAmount = (data) => {
        
    }
    getParity = (data) => {
        let m = 0;
        let f = 0;
        data.map(p => {
            p.gender === 'M' ? m++ : f++
        })
        this.setState({
            parity: {
                m, f
            }
        })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.data !== prevProps.data ||
            this.props.country !== prevProps.country) {
        //   this.fetchData(this.props.userID);
            this.getParity(this.props.data)
        }
      }
    componentDidMount = () => this.displayPop()
    render() {
        return <section 
            className="MapPop"
            style={{top: `${this.state.pos.y}px`, left: `${this.state.pos.x}px`}}
        >
            <h3 className="country">{this.props.country}</h3>
            <span>total: {this.props.data.length}</span>
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