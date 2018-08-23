import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';

import { clearErrors } from '../../../redux/actions/profileActions';

class SingleCellForm extends Component {
  generateSubjectsDropdown = () => {
    if (this.props.semesters && this.state.selectedSemester) {
      // console.log('Yes semester array & selectedSemester have');

      let classNameArray = [];
      this.props.semesters.forEach(singleItem => {
        // console.log('singleItemInsideSemester', singleItem);
        // console.log(
        //   singleItem.name.toString(),
        //   this.state.selectedSemester.value.toString(),
        //   singleItem.name.toString() ===
        //     this.state.selectedSemester.value.toString()
        // );

        if (
          singleItem.name.toString() ===
          this.state.selectedSemester.value.toString()
        ) {
          // console.log('Yes Both name Match');

          classNameArray = singleItem.courses.map(singleClass => {
            // console.log('SingleClassItem ', singleClass);
            return {
              value: `${JSON.stringify(singleClass)}`,
              label: `${singleClass.subject.title}(${
                singleClass.subject.code
              }) - ${singleClass.teacher.name}(${singleClass.teacher.code}) ${
                singleClass.teacher.guest ? ' 🌟' : ''
              }`
            };
          });
          // console.log(classNameArray);
        }
      });
      this.setState({ classesArrayOfThisContext: classNameArray });
    } else {
      this.setState({ classesArrayOfThisContext: [] });
    }
  };
  handleRoutineSemesterChange = selectedSemester => {
    this.setState({ selectedClass: '' });
    this.setState({ selectedSemester }, () => this.generateSubjectsDropdown()); // selectedSemester it's an object
    // console.log(`RoutineSemester Option Selected:`, selectedSemester);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  handleRoutineClassChange = selectedClass => {
    this.setState({ selectedClass });
    // console.log(`RoutineClass Option Selected:`, selectedClass);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  state = {
    selectedSemester: '',
    selectedClass: '',
    errors: {},
    classesArrayOfThisContext: []
  };
  render() {
    const { semesters } = this.props;
    let semesterNameArray = [];
    if (semesters) {
      semesterNameArray = semesters.map(singleItem => ({
        value: `${singleItem.name}`,
        label: (
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`${singleItem.name}`)
            }}
          />
        )
      }));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ marginBottom: '2px' }}>
          <Select
            value={this.state.selectedSemester}
            onChange={this.handleRoutineSemesterChange}
            options={semesterNameArray}
          />
        </span>
        {this.state.selectedSemester && (
          <span style={{ marginBottom: '2px' }}>
            <Select
              value={this.state.selectedClass}
              onChange={this.handleRoutineClassChange}
              options={this.state.classesArrayOfThisContext}
            />
          </span>
        )}
        {this.state.selectedClass &&
          this.state.selectedSemester && (
            <span style={{ textAlign: 'center', margin: '3px 0 0 0' }}>
              <Button isColor="success" isOutlined isSize="small">
                Add
              </Button>
            </span>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // routine: state.routine.routineArray,
    semesters: state.semesters.semesterArray
  };
};
export default connect(mapStateToProps, { clearErrors })(SingleCellForm);
