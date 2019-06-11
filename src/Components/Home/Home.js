import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Nav from './../Nav/Nav'
import Compare from './../Compare/Compare'

class Home extends Component {
    
    render() {
        return <section className="Home">
            <div className="Home__container">
                <h3 className="Home__title">Explore by</h3>
                <Nav />
            </div>
            <Compare />
        </section>
    }
}

export default Home;
