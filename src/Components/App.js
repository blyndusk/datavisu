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
                fields: [],
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
    setAge = (e, reset) => {
        let params = {...this.state.params};
        params.age = reset ? null : e.target.value;  
        this.setState({params});
    }
    setFields = (e) => {
        let params = {...this.state.params};
        if (e.target.checked) params.fields.push(e.target.value)
        else params.fields.map((x, i) => {
            if ( x === e.target.value) params.fields.splice(i, 1);
            return x
        })
        this.setState({params});
    }
    setGender = (e) => {

    }
    render() {
        return <div className="App">
            <Tl data={this.state.timeline}/>
            <Filters
                setAge={this.setAge}
                setFields={this.setFields}
                setGender={(e) => this.setGender(e)}
            />
        </div>;
    }
}

export default App;
