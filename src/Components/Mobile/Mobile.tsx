
import React, { Component } from 'react';


export default class Mobile extends Component {
    render() {
        return <section className="Mobile" style={window.innerHeight < 768 ? {display: "flex"} : {display: "none"}}>
            <h2>Oops</h2>
            <h3>Mobile is not available yet, please come back later !</h3>
        </section>
    }
}
