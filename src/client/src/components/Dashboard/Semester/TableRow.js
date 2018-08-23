import React, { Component } from 'react';
import {
  Help,
  Field,
  Label,
  Control,
  Button,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  Title,
  ModalCardBody,
  ModalCardFooter
} from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './semester.css';
import { clearErrors } from '../../../redux/actions/profileActions';
import {
  removeCourse,
  updateCourse
} from '../../../redux/actions/semesterActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class TableRow extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.data) {
      let propsUpdate = _.pick(nextProps.data, ['_id', 'teacher', 'subject']);
      // console.log(propsUpdate);
      this.setState({ id: propsUpdate._id, ...propsUpdate });
      this.setState({
        deleteBtnLoading: false
      });
    }
  }

  handleDelete = () => {
    this.setState({ deleteBtnLoading: true });
    setTimeout(() => {
      this.props.clearErrors();
      this.props.removeCourse(this.props.SemesterID, this.state.id);
      this.setState({ deleteBtnLoading: false });
    }, 1500);
  };
  handleUpdate = e => {
    e.preventDefault();
    this.setState({ sameInput: false });
    this.setState({ updateBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let course = _.pick(this.state, ['updateTeacher', 'updateSubject']);

    let finalCourse = {};
    finalCourse.teacher = {
      /* IMPORTANT NOTE */
      // order of the objects matter if your are user JSON.stringify()
      // if you put here first, name then code at last guest, it's not gonna work
      guest: course.updateTeacher.value.split('|@|')[2].toString() === 'true',
      name: course.updateTeacher.value.split('|@|')[0],
      code: course.updateTeacher.value.split('|@|')[1]
    };
    finalCourse.subject = {
      title: course.updateSubject.value.split('|@|')[0],
      code: course.updateSubject.value.split('|@|')[1]
    };
    // console.log(finalCourse.teacher);
    // console.log(this.state.teacher);
    if (
      JSON.stringify(finalCourse.teacher) ===
        JSON.stringify(this.state.teacher) &&
      JSON.stringify(finalCourse.subject) === JSON.stringify(this.state.subject)
    ) {
      // show same input
      this.setState({ sameInput: true });
    } else {
      // console.log('Adding course -> ', finalCourse);
      let currentCourses = this.props.semsesterCourses;
      let alreadyExist = false;

      currentCourses.forEach(course => {
        // N.B two course var [one outside the loop]
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
        this.props.updateCourse(
          this.props.SemesterID,
          this.state.id,
          finalCourse
        );
      } else {
        this.setState({ errorMsg: true });
      }
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
        ) === 0 &&
        !this.state.errorMsg &&
        !this.state.sameInput // if error obj === 0 then clean else not
      ) {
        this.setState({ updateTeacher: '' });
        this.setState({ updateSubject: '' });
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ modal: false });
      }
      this.setState({ updateBtnLoading: false });
      this.setState({ errorMsg: false });
      this.setState({ sameInput: false });
    }, 3000);
  };
  handleTeacherChange = updateTeacher => {
    this.setState({ updateTeacher });
    // console.log(`In Update Teacher Option Selected:`, updateTeacher);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  handleSubjectChange = updateSubject => {
    this.setState({ updateSubject });
    // console.log(`In Update Subject Option Selected:`, updateSubject);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };
  constructor(props) {
    super(props);
    this.state = {
      updateTeacher: '',
      updateSubject: '', // Upper two for updating purpose
      id: this.props.data._id,
      teacher: this.props.data.teacher,
      subject: this.props.data.subject,
      errors: {},
      updateBtnLoading: false,
      deleteBtnLoading: false,
      showWarnings: false,
      modal: false,
      errorMsg: false,
      sameInput: false
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    let course = this.state;
    const { updateTeacher, updateSubject } = this.state;
    // console.log(this.props.SemesterID);
    // console.log(course);
    // const { errors } = this.state;
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
    return (
      <tr>
        <td style={{ fontWeight: 500, paddingTop: '.5rem' }}>
          {course.subject.title}({course.subject.code})
        </td>
        <td style={{ fontWeight: 500, paddingTop: '.5rem' }}>
          {course.teacher.name}({course.teacher.code}){' '}
          {course.teacher.guest && (
            <span style={{ color: '#ffd12d' }} aria-label="subject" role="img">
              🌟
            </span>
          )}
        </td>
        <td style={{ minWidth: '11.2rem' }}>
          <div style={{ display: 'flex' }}>
            {this.state.updateBtnLoading ? (
              <ButtonAltSpinner color="#FFDD57" />
            ) : (
              <Button
                style={{ margin: '0 3px' }}
                isColor="success"
                onClick={e => {
                  this.props.clearErrors();
                  this.setState({ errors: {} });
                  this.setState({ modal: true });
                  this.setState({ updateBtnLoading: false });
                  this.setState({ errorMsg: false });
                  this.setState({ sameInput: false });
                  this.setState({ updateTeacher: '' });
                  this.setState({ updateSubject: '' });
                }}
                isOutlined
              >
                {this.state.updateBtnLoading ? 'working...' : 'Update'}
              </Button>
            )}
            {this.state.deleteBtnLoading ? (
              <ButtonAltSpinner color=" #FF3860" />
            ) : (
              <Button isColor="danger" onClick={this.handleDelete} isOutlined>
                {this.state.deleteBtnLoading ? 'working...' : 'Delete'}
              </Button>
            )}
          </div>
          {/* Update Form Model */}
          <Modal isActive={this.state.modal}>
            <ModalBackground />
            <ModalCard>
              <ModalCardHeader>
                {!this.state.updateBtnLoading ? (
                  <ModalCardTitle>Update Course</ModalCardTitle>
                ) : (
                  <ModalCardTitle>Please Wait ! Working...</ModalCardTitle>
                )}
                <Delete
                  onClick={() => {
                    this.props.clearErrors();
                    this.setState({ errors: {} });
                    this.setState({ modal: false });
                    this.setState({ updateBtnLoading: false });
                    this.setState({ errorMsg: false });
                    this.setState({ updateTeacher: '' });
                    this.setState({ updateSubject: '' });
                    this.setState({ sameInput: false });
                  }}
                />
              </ModalCardHeader>
              <ModalCardBody className="custom-model-card">
                {/* Content  */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Title
                    style={{ textAlign: 'center', color: '#1ECD97' }}
                    isSize={5}
                  >
                    Subject: {course.subject.title}({course.subject.code}),{' '}
                    Teacher: {course.teacher.name}({course.teacher.code}){' '}
                    {course.teacher.guest && (
                      <span
                        style={{ color: '#ffd12d' }}
                        aria-label="subject"
                        role="img"
                      >
                        🌟
                      </span>
                    )}
                  </Title>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end'
                    }}
                  >
                    <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                      <Label>Subject</Label>
                      <Control>
                        <Select
                          value={updateSubject}
                          onChange={this.handleSubjectChange}
                          options={subjectsArray}
                        />
                      </Control>
                    </Field>
                    <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                      <Label>Teacher</Label>
                      <Control>
                        <Select
                          value={updateTeacher}
                          onChange={this.handleTeacherChange}
                          options={teachersArray}
                        />
                      </Control>
                    </Field>
                  </div>
                  {this.state.errorMsg && (
                    <Help
                      style={{ textAlign: 'center', fontWeight: 500 }}
                      isColor="danger"
                    >
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
                  {this.state.sameInput && (
                    <Help
                      style={{ textAlign: 'center', fontWeight: 500 }}
                      isColor="danger"
                    >
                      <span
                        aria-label="subject"
                        role="img"
                        style={{ fontWeight: 700, color: '#ff3860' }}
                      >
                        ✋
                      </span>{' '}
                      Wait ! Everything is same ! You changed Nothing !
                    </Help>
                  )}
                </div>
              </ModalCardBody>
              <ModalCardFooter>
                {this.state.updateBtnLoading ? (
                  <div style={{ marginTop: '1.2rem' }}>
                    <ButtonAltSpinner color="#1ECD97" />
                  </div>
                ) : (
                  <Button
                    isColor="success"
                    onClick={this.handleUpdate}
                    disabled={
                      !this.state.updateTeacher || !this.state.updateSubject
                    }
                  >
                    Update
                  </Button>
                )}
              </ModalCardFooter>
            </ModalCard>
          </Modal>
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
  removeCourse,
  updateCourse,
  clearErrors
})(TableRow);
