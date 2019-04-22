import React, { Component } from 'react';
import Axios from 'axios';

import Tl from './Tl/Tl';
import Filters from './Filters/Filters'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            params: {
                age: null,
                field: null,
                gender: null
            }
        }
    }
    fetchData = () => {
        Axios.get('./timeline.json', {
            params: {
                year: 1934
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                host: ' http://172.19.120.186',
                port: 3000
            }
        })
        .then(res => this.setState({ timeline: res.data}))
        .catch(err => console.log(err))
    }
    // fetch the data when the component mounting
    UNSAFE_componentWillMount = () => this.fetchData();
    setAge = (e) => {
        console.log(e.target.value)
        let params = {...this.state.params};
        params.age = e.target.value;                        //updating value
        this.setState({params}, () => console.log("ddd"));
    }
    setFields = (e) => {

    }
    setGender = (e) => {

    }
    render() {
        return <div className="App">
            <Tl data={this.state.timeline}/>
            <Filters
                setAge={(e) => this.setAge(e)}
                setFields={(e) => this.setFields(e)}
                setGender={(e) => this.setGender(e)}
            />
        </div>;
    }
}

export default App;
