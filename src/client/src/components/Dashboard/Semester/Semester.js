import React, { Component } from 'react';
import { Container, Notification, Columns, Column } from 'bloomer';
import {
  Panel,
  PanelHeading,
  PanelBlock,
  Control,
  Input,
  Icon,
  Button
} from 'bloomer';
import { connect } from 'react-redux';
import './semester.css';

import AddSemester from './AddSemester';
import SemesterListItem from './SemesterListItem';

class Semester extends Component {
  render() {
    let semesters = this.props.semesters.semesterArray;
    return (
      <Container isFluid style={{ marginTop: 10 }}>
        <Columns>
          <Column isSize="1/3">
            <Panel>
              <PanelHeading>Add New Semester</PanelHeading>
              <AddSemester />
              <PanelHeading>List of All Semester</PanelHeading>
              <PanelBlock>
                <Control hasIcons="left">
                  <Input isSize="medium" placeholder="Search" />
                  <Icon isSize="medium" isAlign="left">
                    <span className="fa fa-search" aria-hidden="true" />
                  </Icon>
                </Control>
              </PanelBlock>
              {/* below rendering a Panel with search result */}
              <Panel>
                {semesters ? (
                  semesters.map((semester, index) => (
                    <SemesterListItem key={index} semester={semester} />
                  ))
                ) : (
                  <p>No Semester Available! Add New !</p>
                )}
              </Panel>
            </Panel>
          </Column>
          <Column>
            <Notification isColor="info">
              This container is <strong>fluid</strong>: it will have a 20px gap
              on either side.
            </Notification>
          </Column>
        </Columns>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    semesters: state.semesters
  };
};
export default connect(mapStateToProps, null)(Semester);
