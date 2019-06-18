import React, { Component } from 'react';

import Brand from '../Brand/Brand';
import Compare from '../Compare/Compare';
import Nav from '../Nav/Nav';

export default class Home extends Component {
    render() {
        return <section className='Home'>
            <Brand/>
            <div className='Home__container'>
                <h3 className='Home__title'>Explore by</h3>
                <Nav/>
            </div>
            <Compare/>
        </section>;
    }
}
