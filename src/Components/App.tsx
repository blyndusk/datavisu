import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Comparator from './Comparator/Comparator';
import Home from './Home/Home';
import Intro from './Intro/Intro';
import Map from './Map/Map';
import Mobile from './Mobile/Mobile';
import BrandNewTl from './Timeline/Timeline';

export default class App extends Component {
    render() {
        return <div className='App'>
            <Mobile/>
            <Intro/>
            <Router>
            <Route path='/' component={Home}/>
                <Route path='/timeline/' component={BrandNewTl}/>
                <Route path='/map/' component={Map}/>
                <Route path='/comparator/' component={Comparator}/>
            </Router>
        </div>;
    }
}
