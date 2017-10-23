import React from 'react';
import {Form, Control} from 'react-redux-form';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import * as actions from './actions';

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
          <Control.text model=".url" label="Url" component={FieldGroup}/>
          <Button type="submit">Search</Button>
        </Form>
      );
    }
}