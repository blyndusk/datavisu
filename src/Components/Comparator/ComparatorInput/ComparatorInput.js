
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
            <input className="ComparatorInput__search" list="browsers" name="browser" placeholder={this.props.code} onClick={(e) => {
                e.target.value = '';
                e.stopPropagation(); 
                e.target.parentNode.classList.toggle('ComparatorInput--active')
            }} onChange={(e) => this.props.onInputChanged(e)}/>
            <span className="ComparatorInput__icon"></span>
            <datalist id="browsers">
                {
                    this.props.codes.length ? this.props.codes.map(code => <option key={code} value={code} onClick={(e) => {
                        this.props.getCode(e)
                    }}/>) : null
                }
            </datalist>
      </form>
    }
}

export default ComparatorInput;
