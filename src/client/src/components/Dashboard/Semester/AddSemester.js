import React, { Component } from 'react';
import {
  PanelBlock,
  Control,
  Input,
  Icon,
  Button,
  Field,
  Label,
  Help
} from 'bloomer';
import _ from 'lodash';
import { connect } from 'react-redux';

import { addSemester } from '../../../redux/actions/semesterActions';
import { clearErrors } from '../../../redux/actions/profileActions';
import Spinner from '../ButtonAltSpinner/ButtonAltSpinner';

class AddSemester extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.props.clearErrors();
    this.setState({ errors: {} });
    let value = e.target.value;
    // console.log([e.target.name], value);
    this.setState({ [e.target.name]: value }, () => {
      this.setState({ isAddFormEdited: true });
    });
  }
  handleAdd = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let semester = _.pick(this.state, ['section', 'level', 'superscript']);
    let semesterFinalName = semester.section.toUpperCase();

    // put level & superscript value -1 to omit/ignore
    if (
      semester.level.toString() !== '-1' &&
      parseInt(semester.level, 10) > 0
    ) {
      semesterFinalName += `- ${semester.level}`;
      if (semester.superscript.toString() !== '-1') {
        semesterFinalName += `<sup>${semester.superscript}</sup>`;
      }
    }

    this.props.addSemester({ name: semesterFinalName });
    console.log(semesterFinalName);

    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'semesterName'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ section: '' });
        this.setState({ level: '' });
        this.setState({ superscript: '' });
        this.setState({ errors: {} });
        this.props.clearErrors();
      }
      this.setState({ loading: false });
    }, 3000);
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: {},
      section: '',
      level: '',
      superscript: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { errors } = this.state;
    return (
      <PanelBlock className="add-semester-wrapper">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Help
            style={{ textAlign: 'center', fontWeight: 500 }}
            isColor="danger"
          >
            {errors.semesterName}
          </Help>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Section</Label>
              <Control hasIcons="left">
                <Input
                  style={{ textTransform: 'uppercase' }}
                  isColor="success"
                  name="section"
                  placeholder="CSE"
                  value={this.state.section}
                  onChange={this.onChange}
                />
                <Icon isSize="small" isAlign="left">
                  <span className="fas fa-book-open" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Level</Label>
              <Control hasIcons="left">
                <Input
                  isColor="success"
                  name="level"
                  type="number"
                  placeholder="5"
                  value={this.state.level}
                  onChange={this.onChange}
                />
                <Icon isSize="small" isAlign="left">
                  <span
                    className="fas fa-sort-numeric-down"
                    aria-hidden="true"
                  />
                </Icon>
              </Control>
            </Field>
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Superscript</Label>
              <Control hasIcons="left">
                <Input
                  isColor="success"
                  name="superscript"
                  placeholder="th"
                  value={this.state.superscript}
                  onChange={this.onChange}
                />
                <Icon isSize="small" isAlign="left">
                  <span className="fas fa-superscript" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            {this.state.loading ? (
              <div style={{ marginTop: '1.2rem' }}>
                <Spinner color="#1ECD97" />
              </div>
            ) : (
              <Button
                isColor="success"
                onClick={this.handleAdd}
                disabled={!this.state.section || !this.state.level}
              >
                Add
              </Button>
            )}
          </div>
          {(this.state.section ||
            this.state.level ||
            this.state.superscript) && (
            <Help
              isColor="info"
              style={{ textAlign: 'center', fontWeight: 500 }}
            >
              Example: Section: <strong>CSE</strong> | Level: <strong>5</strong>{' '}
              | Superscript: <strong>st/nd/rd/th</strong> etc.
              <span aria-label="subject" role="img">
                {' '}
                😎{' '}
              </span>
              N. B. put level & superscript value -1 to omit/ignore
            </Help>
          )}
        </div>
      </PanelBlock>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, { addSemester, clearErrors })(
  AddSemester
);
