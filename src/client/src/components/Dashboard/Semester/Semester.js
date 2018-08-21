import React, { Component } from 'react';
import { Container, Columns, Column, Notification } from 'bloomer';
import {
  Panel,
  PanelHeading,
  PanelBlock,
  Control,
  Input,
  Icon,
  Title
} from 'bloomer';

import { connect } from 'react-redux';
import { setTextFilter } from '../../../redux/actions/filters';

import './semester.css';
import AddSemester from './AddSemester';
import SemesterListItem from './SemesterListItem';
import { FilterSemester } from '../../../utils/selectors';
import Courses from './Courses';

class Semester extends Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value.toUpperCase());
  };
  onSemesterSelected = (semesterID, semesterData) => {
    this.setState({ selectedSemesterID: semesterID });
    this.setState({ selectedSemesterData: semesterData });
  };
  state = {
    selectedSemesterID: '',
    selectedSemesterData: ''
  };
  render() {
    // console.log(this.state.selectedSemesterID);
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
                    <SemesterListItem
                      onSemesterSelected={this.onSemesterSelected}
                      selectedSemesterID={this.state.selectedSemesterID} // to show active panel
                      key={index}
                      semester={semester}
                    />
                  ))
                ) : (
                  <p>No Semester Available! Add New !</p>
                )}
              </Panel>
              {/*end of all semester list </SemesterList> */}
            </Panel>
          </Column>
          <Column>
            {this.state.selectedSemesterID ? (
              <Courses data={this.state.selectedSemesterData} />
            ) : (
              <Notification isColor="light">
                <Column hasTextAlign="centered">
                  <Title style={{ color: '#209cee' }} isSize={4}>
                    Select a semester from the list{' '}
                    <span
                      style={{ color: '#ffdd57' }}
                      aria-label="subject"
                      role="img"
                    >
                      💡
                    </span>
                  </Title>
                </Column>
              </Notification>
            )}
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
