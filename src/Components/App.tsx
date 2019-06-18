import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Comparator from './Comparator/Comparator'
import Home from './Home/Home'
import BrandNewTl from './Timeline/Timeline'
import Map from './Map/Map'
import Intro from './Intro/Intro';
import Mobile from './Mobile/Mobile'

class App extends Component {    
    render() {
        return <div className="App">
            <Mobile/>
            <Intro/>
            <Router>
            <Route path="/" component={Home}/>
                <Route path="/timeline/" component={BrandNewTl}/>
                <Route path="/map/" component={Map}/>
                <Route path="/comparator/" component={Comparator}/>
            </Router>
        </div>;
    }
}

export default App;
