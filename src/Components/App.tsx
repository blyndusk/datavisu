import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Comparator from './Comparator/Comparator'
import Home from './Home/Home'
import BrandNewTl from './BrandNewTl/BrandNewTl'
import Map from './Map/Map'
import Intro from './Intro/Intro';
import Mobile from './Mobile/Mobile'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            params: {
                age: null,
                fields: [],
                gender: null
            },
            test: "imatest"
        }
    }
    setAge = (e, reset) => {
        let params = {...this.state.params};
        params.age = reset ? null : e.target.value;  
        this.setState({params});
    }
    setFields = (e, reset) => {
        let params = {...this.state.params};
        if (reset) {
            params.fields = []
        } else {
            if (e.target.checked) params.fields.push(e.target.value)
            else params.fields.map((x, i) => {
                if ( x === e.target.value) params.fields.splice(i, 1);
                return x
            })
        }
        this.setState({params});
    }
    setGender = (e, reset) => {
        let params = {...this.state.params};
        params.gender = reset ? null : e.target.value
        this.setState({params});
    }
    render() {
        return <div className="App">
            <Mobile/>
            <Intro/>
            <Router>
            <Route path="/" component={Home} />
                <Route path="/timeline/" component={BrandNewTl}/>
                <Route path="/map/" component={Map} />
                <Route path="/comparator/" component={Comparator} />
            </Router>
        </div>;
    }
}

export default App;
