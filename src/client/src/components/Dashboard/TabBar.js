import React, { Component } from 'react';
import { Tabs, Tab, TabList } from 'bloomer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
/* Implement Reference https://github.com/AlgusDark/bloomer/issues/67 */

import Semester from './Semester/Semester';

const Routine = () => (
  <div>
    <h2>Routine</h2>
  </div>
);

const Subjects = () => (
  <div>
    <h2>Subjects</h2>
  </div>
);

const Teachers = () => (
  <div>
    <h2>Teachers</h2>
  </div>
);

const CustomTab = ({ label, to, activeOnlyWhenExact, icon }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Tab isActive={match}>
        <Link to={to}>
          <span>{label}</span>
        </Link>
      </Tab>
    )}
  />
);

export default class TabBar extends Component {
  render() {
    return (
      <Router>
        <div>
          <Tabs isAlign="centered" isBoxed={true}>
            <TabList isAlign="centered">
              <CustomTab to="/dashboard" label="Routine" />
              <CustomTab to="/music" label="Semester" />
              <CustomTab to="/video" label="Subjects" />
              <CustomTab to="/documents" label="Teachers" />
            </TabList>
          </Tabs>

          <Route path="/dashboard" component={Routine} />
          <Route path="/music" component={Semester} />
          <Route path="/video" component={Subjects} />
          <Route path="/documents" component={Teachers} />
        </div>
      </Router>
    );
  }
}
