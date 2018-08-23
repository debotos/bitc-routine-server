import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';

import { clearErrors } from '../../../redux/actions/profileActions';

class SingleCell extends Component {
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
              }) - ${singleClass.teacher.name}(${singleClass.teacher.code})`
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
      <td>
        <p style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginBottom: '2px' }}>
            {/* <div> cannot appear as a descendant of <p>, But there is no simple way to do it*/}
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
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2px'
            }}
          >
            <span>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize('CSE- 7<sup>th</sup>')
                }}
              />: (207) - SR
            </span>

            <span>
              <Button isColor="warning" isOutlined isSize="small">
                <span className="icon is-small">
                  <i className="fas fa-trash" />
                </span>
              </Button>
            </span>
          </span>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2px'
            }}
          >
            <span>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize('CSE- 7<sup>th</sup>')
                }}
              />: (207) - EM
            </span>
            <span>
              <Button isColor="warning" isOutlined isSize="small">
                <span className="icon is-small">
                  <i className="fas fa-trash" />
                </span>
              </Button>
            </span>
          </span>
        </p>
      </td>
    );
  }
}

const mapStateToProps = state => {
  return {
    // routine: state.routine.routineArray,
    semesters: state.semesters.semesterArray
  };
};
export default connect(mapStateToProps, { clearErrors })(SingleCell);
