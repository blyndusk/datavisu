import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Compare extends Component {
    render() {
        return <Link className="Compare" to="/comparator">
            <span className="Compare__icon"></span>
            <span className="Compare__text">Compare countries</span>
        </Link>
    }
}
