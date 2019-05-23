
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
    
    render() {
        return <section className="Home">   
            <h2>Home</h2>
            <ul>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/timeline">Timeline</Link>
                    </li>
                    <li>
                        <Link to="/Home">Home</Link>
                    </li>
                </ul>
        </section>
    }
}

export default Home;
