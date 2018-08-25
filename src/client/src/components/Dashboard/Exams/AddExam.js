import React, { Component } from 'react';
import { Help, Button } from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DOMPurify from 'dompurify';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { clearErrors } from '../../../redux/actions/profileActions';
import { addExam } from '../../../redux/actions/examActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class AddExam extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.errors.id) {
        this.setState({ isAddFormEdited: false });
      }
    }
  }

  handleRoutineSemesterChange = semesters => {
    this.setState({ semesters }, () => {
      this.setState({ isAddFormEdited: true });
    }); // semesters it's an object
    // console.log(`Semester Option Selected:`, semesters);
    this.props.clearErrors();
    this.setState({ errors: {} });
  };

  handleAdd = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.props.clearErrors();
    this.setState({ isAddFormEdited: true });
    let exam = _.pick(this.state, ['firstmid', 'finalmid', 'semesters']);
    // console.log('formatting ', exam);

    exam.firstmid = exam.firstmid.format();
    exam.finalmid = exam.finalmid.format();
    exam.semesters = exam.semesters.map(singleItem => {
      // console.log(singleItem.value);
      return singleItem.value;
    });
    let exist = false;
    this.props.exams &&
      this.props.exams.forEach(singleItem => {
        if (_.isEqual(singleItem.semesters, exam.semesters)) {
          exist = true;
        }
      });
    if (!exist) {
      this.setState({ examBtnLoading: true });
      this.props.addExam(exam);
      setTimeout(() => {
        if (
          _.size(
            // checking errors obj size
            _.pick(this.state.errors, [
              // pick only the actual error not successMsg field that i tricked
              'firstmid',
              'finalmid',
              'semesters'
            ])
          ) === 0 // if error obj === 0 then clean else not
        ) {
          this.setState({ firstmid: moment() });
          this.setState({ finalmid: moment() });
          this.setState({ semesters: [] });
          this.setState({ errors: {} });
          this.props.clearErrors();
          this.setState({ isAddFormEdited: false });
        }
        this.setState({ examBtnLoading: false });
      }, 2000);
    } else {
      this.setState({ showMsg: true });
      setTimeout(() => {
        this.setState({ showMsg: false });
      }, 1500);
    }
  };
  handleFirstmidChange = day => {
    // console.log(day.format());
    this.props.clearErrors();
    this.setState({ errors: {} });
    this.setState({ firstmid: day }, () => {
      this.setState({ isAddFormEdited: true });
    });
  };
  handleFinalmidChange = day => {
    // console.log(day.format());
    this.props.clearErrors();
    this.setState({ errors: {} });
    this.setState({ finalmid: day }, () => {
      this.setState({ isAddFormEdited: true });
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      firstmid: moment(),
      finalmid: moment(),
      isAddFormEdited: false,
      errors: {},
      examBtnLoading: false,
      semesters: [],
      showMsg: false
    };
  }
  render() {
    const { errors } = this.state;
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
      <tr>
        <td style={{ minWidth: '11.2rem' }}>
          <div className="field">
            <div className="control">
              <Select
                value={this.state.semesters}
                multi={true}
                onChange={this.handleRoutineSemesterChange}
                options={semesterNameArray}
                closeOnSelect={false}
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.semesters}
              </Help>
            )}
          </div>
        </td>
        <td>
          <div className="field">
            <div className="control">
              {/* Timepicker of firstmid */}
              <DatePicker
                className="input is-info"
                selected={this.state.firstmid}
                onChange={this.handleFirstmidChange}
                // dateFormat="LL"
                dateFormat="DD/MM/YYYY"
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.firstmid}
              </Help>
            )}
          </div>
        </td>
        <td>
          <div className="field">
            <div className="control">
              {/* Timepicker of finalmid */}
              <DatePicker
                className="input is-info"
                selected={this.state.finalmid}
                onChange={this.handleFinalmidChange}
                // dateFormat="LL"
                dateFormat="DD/MM/YYYY"
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.finalmid}
              </Help>
            )}
          </div>
        </td>
        <td>
          {this.state.examBtnLoading ? (
            <ButtonAltSpinner color="#209CEE" />
          ) : (
            <Button
              style={{ margin: '3px 0' }}
              isColor="info"
              isOutlined
              disabled={
                !this.state.firstmid ||
                !this.state.finalmid ||
                !this.state.semesters.length
              }
              onClick={this.handleAdd}
            >
              {this.state.examBtnLoading ? 'working...' : 'Add Exam'}
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
    semesters: state.semesters.semesterArray,
    exams: state.exams.exams
  };
};

export default connect(mapStateToProps, {
  addExam,
  clearErrors
})(AddExam);
