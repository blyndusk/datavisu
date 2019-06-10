
import React, { Component } from 'react';

class FieldTemplate extends Component {
    componentDidUpdate = (prevProps) => {
        if (this.props.country !== prevProps.country ) {
            console.log('done')
        }
    }
    render() {

        return <div className="ParityTeamplate">
           {/* <p>{this.props.country[0].name}</p> */}
        </div>
    }
}

export default FieldTemplate;
