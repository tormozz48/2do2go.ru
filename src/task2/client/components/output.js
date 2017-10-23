import React from 'react';
import {connect} from 'react-redux';

class Output extends React.Component {    
    render() {
        return (
            <div>{this.props.value}</div>  
        );
    }
}

export default connect(
    (state) => ({value: state.output.data}),
    (dispatch) => ({})
)(Output);