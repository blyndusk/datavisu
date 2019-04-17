import React, { Component } from 'react';
import Axios from 'axios';

import Tl from './Tl/Tl';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: []
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
    render() {
        return <div className="App">
            <Tl data={this.state.timeline}/>
        </div>;
    }
}

export default App;
