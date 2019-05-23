
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Comparator extends Component {
    
    render() {
        return <section className="Comparator">   
            <h2>Comparator</h2>
            <ul>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/timeline">Timeline</Link>
                    </li>
                    <li>
                        <Link to="/comparator">Comparator</Link>
                    </li>
                </ul>
        </section>
    }
}

export default Comparator;
