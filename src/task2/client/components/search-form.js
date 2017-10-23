import React from 'react';
import { Form, Field, Control } from 'react-redux-form';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import * as actions from './actions';

const isValidUrl = (url) => /^https?:\/\/www\.reddit\.com\/r\/\w+\/\.json$/.test(url);

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function SelectField({ id, label, model, options }) {
  options = options.map((option) => {
    return <option value={option}>{option}</option>;
  });

  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <Control.select model={model} className="form-control">
        {options}
      </Control.select>
    </FormGroup>
  );
}

export default class SearchForm extends React.Component {
  handleSubmit(values) {
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

        <SelectField
          id="sortField"
          label="Sort Field"
          model=".sort.field"
          options={["domain", "count", "score"]}
        />

        <FormGroup controlId="sortDirection">
          <ControlLabel>Sort Direction</ControlLabel>
          <Field model=".sort.direction">
            <label className="direction-label">
              <input className="radio" type="radio" value="asc" />
              Asc
              </label>
            <label className="direction-label">
              <input className="radio" type="radio" value="desc" />
              Desc
              </label>
          </Field>
        </FormGroup>

        <SelectField
          id="outputType"
          label="Output Type"
          model=".output.type"
          options={["csv", "json", "sql"]}
        />

        <Button type="submit">Search</Button>
      </Form>
    );
  }
}