
import React, { Component } from 'react';
import axios from 'axios';

class ComparatorInput extends Component {
   constructor(props) {
       super(props); 
       this.state = {
            baseUrl: 'http://9f712c9f.ngrok.io/api/',
            // 2 types of API filters
            type: [
                'people',
                'prices', 
                'categories'
            ],
            codes: []
       }
   }
    componentDidMount = () => {
        axios.get(this.state.baseUrl + this.state.type[0])
            .then(res => {
                const response =  res.data["hydra:member"]
                const codes = []
                response.map(people => {
                    const code = people.idcountry.code
                    if (codes.indexOf(code) === -1) codes.push(code)
                    return code
                })
                this.setState({
                    codes
                }, () => console.log(this.state.codes))
            })
            .catch(err => console.log(err))
    }
    onInputChanged = (e) => {
        if (e.target.value.length === 2 && this.state.codes.indexOf(e.target.value.toUpperCase()) > -1) console.log(e.target.value);
      }  
    addFilter = (e) => e.target.dataset.label;
    
    
    render() {
        return <form className="ComparatorInput" action="/action_page.php" method="get">

        {/* onClick={this.renderClick}></div> */}
            <input list="browsers" name="browser" placeholder="FR" onChange={this.onInputChanged}/>
            <datalist id="browsers">
                {
                    this.state.codes.map(code => <option key={code} value={code} onClick={(e) => {
                        this.props.getCode(e)
                        console.log(e.target.parentNode.parentNode.querySelector('input'))
                    }}/>)
                }
              
            </datalist>
            <input type="submit"/>
      </form>
    }
}

export default ComparatorInput;
