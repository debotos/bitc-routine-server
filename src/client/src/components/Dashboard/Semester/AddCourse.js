import React, { Component } from 'react';
import { Help, Button } from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './semester.css';
import { clearErrors } from '../../../redux/actions/profileActions';
import { addCourse } from '../../../redux/actions/semesterActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class AddCourse extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleAdd = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let course = _.pick(this.state, ['teacher', 'subject']);
    let finalCourse = {};
    finalCourse.teacher = {
      /* IMPORTANT NOTE */
      // order of the objects matter if your are user JSON.stringify()
      // if you put here first, name then code at last guest, it's not gonna work
      guest: course.teacher.value.split('|@|')[2].toString() === 'true',
      name: course.teacher.value.split('|@|')[0],
      code: course.teacher.value.split('|@|')[1]
    };
    finalCourse.subject = {
      title: course.subject.value.split('|@|')[0],
      code: course.subject.value.split('|@|')[1]
    };
    // console.log('Adding course -> ', finalCourse);
    let currentCourses = this.props.semsesterCourses;
    let alreadyExist = false;

    currentCourses.forEach(course => {
      // console.log(
      //   'First => ',
      //   JSON.stringify(course.subject),
      //   JSON.stringify(finalCourse.subject)
      // );
      // console.log(
      //   JSON.stringify(course.subject) === JSON.stringify(finalCourse.subject)
      // );
      // console.log(
      //   'Second => ',
      //   JSON.stringify(course.teacher),
      //   JSON.stringify(finalCourse.teacher)
      // );
      // console.log(
      //   JSON.stringify(course.teacher) === JSON.stringify(finalCourse.teacher)
      // );

      if (
        JSON.stringify(course.subject) ===
          JSON.stringify(finalCourse.subject) &&
        JSON.stringify(course.teacher) === JSON.stringify(finalCourse.teacher)
      ) {
        alreadyExist = true;
      }
    });

    if (!alreadyExist) {
      this.props.addCourse(this.props.semsesterID, finalCourse);
    } else {
      this.setState({ showMsg: true });
    }

    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors.subject, [
            // pick only the actual error not successMsg field that i tricked
            'title',
            'code'
          ])
        ) === 0 &&
        _.size(
          // checking errors obj size
          _.pick(this.state.errors.teacher, [
            // pick only the actual error not successMsg field that i tricked
            'name',
            'code'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ teacher: '' });
        this.setState({ subject: '' });
        this.setState({ errors: {} });
        this.props.clearErrors();
      }
      this.setState({ loading: false });
      this.setState({ showMsg: false });
    }, 3000);
  };
  constructor(props) {
    super(props);
    this.state = {
      teacher: '',
      subject: '',
      errors: {},
      loading: false,
      showMsg: false
    };
  }
  handleTeacherChange = teacher => {
    this.setState({ teacher });
    // console.log(`Teacher Option Selected:`, teacher);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  handleSubjectChange = subject => {
    this.setState({ subject });
    // console.log(`Subject Option Selected:`, subject);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  render() {
    const { teacher, subject } = this.state;
    // console.log('AddCourse.js received props => ', this.props);
    // console.log('AddCourse Errors -> ', this.state.errors);
    const { teachers, subjects } = this.props;
    // console.log(teachers, subjects);
    // Here converting an array of string to array of obj coz requirement of react-select
    let subjectsArray = [];
    if (subjects) {
      subjectsArray = subjects.map(singleItem => ({
        value: `${singleItem.title}|@|${singleItem.code}`,
        label: `${singleItem.title} (${singleItem.code})`
      }));
    }
    let teachersArray = [];
    if (teachers) {
      teachersArray = teachers.map(singleItem => ({
        value: `${singleItem.name}|@|${singleItem.code}|@|${singleItem.guest}`,
        label: `${singleItem.name} (${singleItem.code}) ${singleItem.guest &&
          '🌟'}`
      }));
    }
    // console.log(teachersArray);
    // console.log(subjectsArray);

    return (
      <tr>
        <td className="selectable-input">
          <div className="field">
            <div className="control">
              <Select
                value={subject}
                onChange={this.handleSubjectChange}
                options={subjectsArray}
              />
            </div>
          </div>
        </td>
        <td className="selectable-input">
          <div className="field">
            <div className="control">
              <Select
                value={teacher}
                onChange={this.handleTeacherChange}
                options={teachersArray}
              />
            </div>
          </div>
        </td>
        <td>
          {this.state.loading ? (
            <ButtonAltSpinner color="#209CEE" />
          ) : (
            <Button
              style={{ margin: '3px 0' }}
              isColor="info"
              isOutlined
              disabled={!this.state.teacher || !this.state.subject}
              onClick={this.handleAdd}
            >
              {this.state.loading ? 'working...' : 'Add ✔️'}
            </Button>
          )}
          {this.state.showMsg && (
            <Help isColor="danger">
              <span
                aria-label="subject"
                role="img"
                style={{ fontWeight: 700, color: '#ff3860' }}
              >
                ✋
              </span>{' '}
              Already Exist !
            </Help>
          )}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    subjects: state.subjects.subjects,
    teachers: state.teachers.teachers
  };
};

export default connect(mapStateToProps, {
  addCourse,
  clearErrors
})(AddCourse);
