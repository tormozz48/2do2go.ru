import React from 'react';

import {Grid, Row, Col, Panel, Navbar} from 'react-bootstrap';

import SearchForm from './search-form';
import Output from './output';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Reddit Aggregator</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Grid fluid={false}>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <Panel header="Search Parameters">
                                <SearchForm/>
                            </Panel>
                        </Col>
                        <Col xs={12} md={8}>
                            <Panel header="Result">
                                <Output/>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;