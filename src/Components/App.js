import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Comparator from './Comparator/Comparator'
import Home from './Home/Home'
import Tl from './Tl/Tl';
import Filters from './Filters/Filters'
import Map from './Map/Map'
import Intro from './Intro/Intro';

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
    fetchData = (params) => {
        axios.get('./timeline.json', {
            params: {
                ...params
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                host: ' http://172.19.120.186',
                port: 3000
            }
        })
        .then(res => {
            this.setState({ timeline: res.data})
        })
        .catch(err => console.log(err))

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.params !== prevState.params) {
            this.fetchData(this.state.params);
        }
    }
    // fetch the data when the component mounting
    UNSAFE_componentWillMount = () => this.fetchData(this.state.params);
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
            <Intro/>
            <Router>
            <Route path="/" component={Home} />
                <Route path="/timeline/" component={() => (<Fragment>
                    <Tl data={this.state.timeline}/>
                    <Filters
                        setAge={this.setAge}
                        setFields={this.setFields}
                        setGender={this.setGender}
                    />
                </Fragment>)}/>
                <Route path="/map/" component={Map} />
                <Route path="/comparator/" component={Comparator} />
            </Router>
        </div>;
    }
}

export default App;
