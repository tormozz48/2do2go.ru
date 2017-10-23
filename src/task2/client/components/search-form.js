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
          
          <FormGroup controlId="sortField">
            <ControlLabel>Sort Field</ControlLabel>
            <Control.select model=".sort.field" className="form-control">
              <option value="domain">domain</option>
              <option value="count">count</option>
              <option value="score">score</option>
            </Control.select>
          </FormGroup>

          <FormGroup controlId="sortDirection">
            <ControlLabel>Sort Direction</ControlLabel>
            <Field model=".sort.direction">
              <label className="direction-label">
                <input className="radio" type="radio" value="asc"/>
                Asc
              </label>
              <label className="direction-label">
                <input className="radio" type="radio" value="desc"/>
                Desc
              </label>
            </Field>
          </FormGroup>

          <FormGroup controlId="outputType">
            <ControlLabel>Output Type</ControlLabel>
            <Control.select model=".output.type" className="form-control">
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