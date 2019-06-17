import React, { Component } from 'react';

class Intro extends Component {
    hideIntro = (e) => {
        e.target.parentNode.parentNode.style.display = 'none'
    }
    render() {
        return <section className="Intro">
            <div className="Intro__container">
                <h1 className="Intro__title">Nobel Prize</h1>
                <h2 className="Intro__subtitle">An interactive data-visualization on Nobel Prizes</h2>
                <button className="Intro__button" onClick={this.hideIntro}>Start</button>
            </div>
        </section>
    }
}

export default Intro;
