import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

class Output extends React.Component {   
    _prepareData(value) {
        if (this.props.type === 'json') {
            return JSON.stringify(value);
        }

        return _(value)
            .split('\n')
            .map((row, index) => <div key={index}>{row}</div>)
            .value()
    }
    
    render() {
        return (
            <div>{this._prepareData(this.props.value)}</div>  
        );
    }
}

export default connect(
    (state) => ({
        type: state.output.type,
        value: state.output.data
    }),
    (dispatch) => ({})
)(Output);