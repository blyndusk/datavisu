import React from 'react';

interface P {
    codes: any;
    code: string;
    onInputChanged: any;
}

export default class ComparatorInput extends React.Component<P> {
    toggleClass = (e: any) => {
        // empty input
        e.target.value = '';
        // stop propagation
        e.stopPropagation();
        // toggle class
        e.target.parentNode.classList.toggle('ComparatorInput--active');
    }
    render() {
        return <form className='ComparatorInput'>
            <input
                className='ComparatorInput__search'
                list='countries'
                name='countries'
                // props value
                placeholder={this.props.code}
                // toggle class on click
                onClick={this.toggleClass}
                // props method on input change
                onChange={this.props.onInputChanged}
            />
            <span className='ComparatorInput__icon'/>
            <datalist id='countries'>
                {this.props.codes.length ? this.props.codes.map((code: {code: string, name: string}) => <option
                    // for every code, DOM an option
                    key={code.code}
                    // same key & value
                    value={code.code}
                    // name on dataset
                    data-name={code.name}
                />) : null}
            </datalist>
        </form>;
    }
}
