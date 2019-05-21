
import React, { Component } from 'react';
import MapSVG from './SVG/MapSVG'

class Map extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount = () => {
        console.log(document.querySelectorAll('.Map path'))
        const paths = document.querySelectorAll('.Map path');
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            path.style.fill = `hsl(248, 100%, ${Math.floor(Math.random() * (90 - 10) ) + 10}%)`
            
        }
    }
    render() {
        return <section className="Map">    
        <MapSVG/>
         </section>
    }
}

export default Map;
