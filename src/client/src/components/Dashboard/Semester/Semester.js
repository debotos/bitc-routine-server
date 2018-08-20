import React, { Component } from 'react';
import { Container, Notification, Columns, Column } from 'bloomer';
import { Panel, PanelHeading, PanelBlock, Control, Input, Icon } from 'bloomer';
import { connect } from 'react-redux';
import { setTextFilter } from '../../../redux/actions/filters';

import './semester.css';
import AddSemester from './AddSemester';
import SemesterListItem from './SemesterListItem';
import { FilterSemester } from '../../../utils/selectors';

class Semester extends Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value.toUpperCase());
  };
  render() {
    let semesters = this.props.semesters;
    // console.log(semesters);
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
                  <Input
                    style={{ textTransform: 'uppercase' }}
                    isSize="medium"
                    placeholder="Search (N.B. Case-Sensitive)"
                    onChange={this.onTextChange}
                  />
                  <Icon isSize="medium" isAlign="left">
                    <span className="fa fa-search" aria-hidden="true" />
                  </Icon>
                </Control>
              </PanelBlock>
              {/* below rendering a Panel with filter/search result */}
              {/* all semester list start, i will call it <SemesterList> component */}
              <Panel>
                {semesters ? (
                  semesters.map((semester, index) => (
                    <SemesterListItem key={index} semester={semester} />
                  ))
                ) : (
                  <p>No Semester Available! Add New !</p>
                )}
              </Panel>
              {/*end of all semester list </SemesterList> */}
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
    semesters: FilterSemester(state.semesters.semesterArray, state.filters)
  };
};
export default connect(mapStateToProps, { setTextFilter })(Semester);
