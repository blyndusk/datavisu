
import React, { Component } from 'react';
import axios from 'axios';

class ComparatorInput extends Component {
   constructor(props) {
       super(props); 
       
   }
    componentDidMount = () => {
        console.log(this.props.codes)
    }
    
    
    
    render() {
        return <form className="ComparatorInput" action="/action_page.php" method="get">

        {/* onClick={this.renderClick}></div> */}
            <input list="browsers" name="browser" placeholder="FR" onChange={(e) => this.props.onInputChanged(e)}/>
            <datalist id="browsers">
                {
                    this.props.codes.length ? this.props.codes.map(code => <option key={code} value={code} onClick={(e) => {
                        this.props.getCode(e)
                    }}/>) : null
                }
              
            </datalist>
            <input type="submit"/>
      </form>
    }
}

export default ComparatorInput;
