import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return <nav className="Nav">
            <Link className="Nav__button" to="/map">
                <span className="Nav__icon Nav__icon--map"></span>
                <span className="Nav__text">Map</span>
            </Link>
            <Link className="Nav__button" to="/timeline">
                <span className="Nav__icon Nav__icon--timeline"></span>
                <span className="Nav__text">Timeline</span>
            </Link>
        </nav>
    }
}

export default Nav;
