
import React, { Component } from 'react';

class Intro extends Component {
    render() {
        return <section className="Intro">
            <div className="Intro__container">
                <h2 className="Intro__title">Nobel Prize</h2>
                <h3 className="Intro__subtitle">An interactive data-visualization on Nobel Prizes</h3>
                <button className="Intro__button">Start</button>
            </div>
        </section>
    }
}

export default Intro;
