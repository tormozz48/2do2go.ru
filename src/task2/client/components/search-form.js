import React from 'react';
import {Form, Field, Control} from 'react-redux-form';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Radio} from 'react-bootstrap';
import * as actions from './actions';

const isValidUrl = (url) => /^https?:\/\/www\.reddit\.com\/r\/\w+\/\.json$/;

function FieldGroup({id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
}

export default class SearchForm extends React.Component {
    handleChange(values) {
        console.log(this.state);
        console.log(values);
    }

    handleUpdate(form) {
        console.log(form);
    }
    
    handleSubmit(values) {
        console.log('handleSubmit');
        console.log(values);

        actions.searchData(values);
    }

    render() {
      return (
        <Form model="search" onSubmit={this.handleSubmit.bind(this)}>
          <Control.text 
            model=".url" 
            label="Url" 
            component={FieldGroup} 
            required
            validators={isValidUrl}
          />
          
          <FormGroup controlId="outputType">
            <ControlLabel>Output Type</ControlLabel>
            <Control.select model=".output.type" className="form-control" onChange={this.handleChange.bind(this)}>
              <option value="csv">csv</option>
              <option value="json">json</option>
              <option value="sql">sql</option>
            </Control.select>
          </FormGroup>   
          <Button type="submit">Search</Button>
        </Form>
      );
    }
}