import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
    
} 

interface NavState {
    page: string,
    mapClass: string
    tlClass: string
} 

class Nav extends React.Component<NavProps, NavState> {
    UNSAFE_componentWillMount = () => {
        this.setState({
            mapClass: "Nav__button",
            tlClass: "Nav__button"
        })
    }
    componentDidMount() {
        
        this.setState({ page: window.location.pathname.replace('/', '')}, () => {
            switch (this.state.page) {
                case 'map':
                    this.setState({
                        mapClass: "Nav__button Nav__button--active",
                        tlClass: "Nav__button"
                    })
                    break;
                case 'timeline':
                    this.setState({
                        mapClass: "Nav__button",
                        tlClass: "Nav__button Nav__button--active"
                    })
                    break;
                default:
                    break;
            }
        })
    }
    render() {
        return <nav className="Nav">
            <Link className={this.state.mapClass} to="/map">
                <span className="Nav__icon Nav__icon--map"></span>
                <span className="Nav__text">Map</span>
            </Link>
            <Link className={this.state.tlClass} to="/timeline">
                <span className="Nav__icon Nav__icon--timeline"></span>
                <span className="Nav__text">Timeline</span>
            </Link>
        </nav>
    }
}

export default Nav;
