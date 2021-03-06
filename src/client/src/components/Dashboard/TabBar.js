import React, { Component } from 'react';
import { Tabs, Tab, TabList } from 'bloomer';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
/* Implement Reference https://github.com/AlgusDark/bloomer/issues/67 */
import Routine from './Routine/Routine';
import Semester from './Semester/Semester';
import Teachers from './Teachers/Teachers';
import Subjects from './Subjects/Subjects';
import Exams from './Exams/Exams';
import { clearErrors } from '../../redux/actions/profileActions';

const CustomTab = ({ label, to, activeOnlyWhenExact, clear }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Tab isActive={match} onClick={() => clear()}>
        {/* cleaning global all errors so that one tab's error doesn't affect another tab */}
        <Link to={to}>
          <span style={{ fontWeight: 600 }}>{label}</span>
        </Link>
      </Tab>
    )}
  />
);
class TabBar extends Component {
  render() {
    let { clearErrors } = this.props;
    return (
      <Router>
        <div>
          <Tabs isAlign="centered" isBoxed={true}>
            <TabList isAlign="centered">
              <CustomTab to="/dashboard" label="Routine" clear={clearErrors} />
              <CustomTab to="/semester" label="Semester" clear={clearErrors} />
              <CustomTab to="/subjects" label="Subjects" clear={clearErrors} />
              <CustomTab to="/teachers" label="Teachers" clear={clearErrors} />
              <CustomTab to="/exams" label="Exams" clear={clearErrors} />
            </TabList>
          </Tabs>
          <Route path="/dashboard" component={Routine} />
          <Route path="/semester" component={Semester} />
          <Route path="/subjects" component={Subjects} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/exams" component={Exams} />
        </div>
      </Router>
    );
  }
}
export default connect(null, { clearErrors })(TabBar);
