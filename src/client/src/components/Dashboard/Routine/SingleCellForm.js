import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import _ from 'lodash';

import { clearErrors } from '../../../redux/actions/profileActions';
import { addClass } from '../../../redux/actions/routineActions';

import { ShowError } from './AddPeriod';

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
    this.setState({ selectedClass }, () => {
      this.checkExistOrNot();
    });
    // console.log(`RoutineClass Option Selected:`, selectedClass);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  handleAdd = () => {
    let Period_ID = this.props.Period_ID;
    let day = this.props.day;
    this.setState({ loading: true });
    let course = JSON.parse(this.state.selectedClass.value);
    let semester = this.state.selectedSemester.value;

    let data = {
      semester,
      teacher: course.teacher,
      subject: course.subject
    };
    // console.log('sending data', data);
    this.props.addClass(Period_ID, day, data);
    setTimeout(() => {
      this.setState({ loading: false });
      this.setState({
        selectedSemester: '',
        selectedClass: ''
      });
    }, 1000);
  };
  checkExistOrNot = () => {
    if (this.state.selectedClass && this.state.selectedSemester) {
      let course = JSON.parse(this.state.selectedClass.value);
      let semester = this.state.selectedSemester.value;
      let data = {
        semester,
        teacher: course.teacher,
        subject: course.subject
      };
      let exist = false;
      this.props.routine.forEach(singlePeriod => {
        if (singlePeriod._id.toString() === this.props.Period_ID.toString()) {
          let allClass = singlePeriod.days[this.props.day].classes;
          allClass.forEach(singleClass => {
            delete singleClass._id;
            // ----------------- Important Note -------------------
            // Use JSON.stringify() to compare simple object having no nested node
            // _.isEqual(obj_1, obj_2) is a good method for complex nested
            if (_.isEqual(singleClass, data)) {
              exist = true;
            }
          });
        }
      });

      if (exist) {
        this.setState({
          errorMsg: (
            <span
              aria-label="subject"
              role="img"
              style={{ fontWeight: 700, color: '#ff3860' }}
            >
              Subject Exist Blind ! Look down 👇
            </span>
          )
        });
      } else {
        this.setState({ errorMsg: '' });
      }
    } else {
      this.setState({ errorMsg: '' });
    }
  };
  state = {
    selectedSemester: '',
    selectedClass: '',
    errors: {},
    classesArrayOfThisContext: [],
    loading: false,
    errorMsg: ''
  };

  render() {
    const { semesters } = this.props;
    // console.log(this.state.errorMsg);

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
        {this.state.errorMsg &&
          this.state.selectedClass &&
          this.state.selectedSemester && (
            <ShowError error={this.state.errorMsg} />
          )}
        {!this.state.errorMsg &&
          this.state.selectedClass &&
          this.state.selectedSemester && (
            <span style={{ textAlign: 'center', margin: '3px 0 0 0' }}>
              <Button
                isColor="success"
                isOutlined
                isSize="small"
                isLoading={this.state.loading}
                onClick={this.handleAdd}
                render={props => <a {...props}>Add</a>}
              />
            </span>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    routine: state.routine.routineArray,
    semesters: state.semesters.semesterArray
  };
};
export default connect(mapStateToProps, { clearErrors, addClass })(
  SingleCellForm
);
