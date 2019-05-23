
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
    
    render() {
        return <section className="Home">   
            <h2>Home</h2>
            <nav id="nav">
                <Link to="/map">MAP</Link>
                <Link to="/timeline">TL</Link>
            </nav>
            <button id="comparator"><Link to="/comparator">COMPARE COUNTRIES</Link></button>
        </section>
    }
}

export default Home;
