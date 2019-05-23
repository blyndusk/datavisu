
import React, { Component } from 'react';
import MapSVG from './MapSVG/MapSVG'
import MapFilters from './MapFilters/MapFilters'
import MapLegend from './MapLegend/MapLegend';

class Map extends Component {
    componentDidMount = () => {
        this.setCountryColors();
    }
    setCountryColors = () => {
        [...document.querySelectorAll('.Map path')].map(path => {
            const color = Math.floor(Math.random() * (66 - 24)) + 24;
            return path.style.fill = `hsl(213, ${color}%, ${color}%)`
        });
        [...document.querySelectorAll('.Map g')].map(g => g.addEventListener('mouseenter', () => console.log(g.id)))
    }
    
    render() {
        return <section className="Map">    
            <MapSVG/>
            <MapFilters/>
            <MapLegend/>
        </section>
    }
}

export default Map;
