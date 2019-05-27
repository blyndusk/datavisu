
import React, { Component } from 'react';

import CompareAge from './CompareAge/CompareAge';
import CompareFields from './CompareFields/CompareFields';
import CompareParity from './CompareParity/CompareParity';
import CompareUniversities from './CompareUniversities/CompareUniversities';

class Comparator extends Component {
    
    render() {
        return <section className="Comparator">   
            <h2>Comparator</h2>
            <CompareAge/>
            <CompareFields/>
            <CompareParity/>
            <CompareUniversities/>
        </section>
    }
}

export default Comparator;
