


import React, { Component } from 'react';

class FieldsLegend extends Component {
    
    render() {
        return <div className="Comparator__legend">
            <div className="Comparator__dots">
                <div className="Comparator__dot"></div>
                <div className="Comparator__dot"></div>
                <div className="Comparator__dot"></div>
                <div className="Comparator__dot"></div>
                <div className="Comparator__dot"></div>
                <div className="Comparator__dot"></div>
            </div>
            <div className="Comparator__labels">
                <span className="Comparator__label">Phy</span>
                <span className="Comparator__label">Chem</span>
                <span className="Comparator__label">Med</span>
                <span className="Comparator__label">Pea</span>
                <span className="Comparator__label">Lit</span>
                <span className="Comparator__label">Eco</span>
            </div>
        </div>
    }
}

export default FieldsLegend;
