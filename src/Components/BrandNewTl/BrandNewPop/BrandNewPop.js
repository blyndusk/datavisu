
import React, { Component } from 'react';
import { spawn } from 'child_process';

class BrandNewPop extends Component {
    
    render() {
        return <div className="BrandNewPop">
            {Object.keys(this.props.data).map((woman, i) => <span key={i}>{woman}</span>)}
        </div>
    }
}

export default BrandNewPop;
