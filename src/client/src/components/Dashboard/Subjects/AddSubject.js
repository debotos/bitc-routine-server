import React, { Component } from 'react';
import { Help, Button, Input } from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';

import { clearErrors } from '../../../redux/actions/profileActions';
import { addSubject } from '../../../redux/actions/subjectActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class AddSubject extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.errors.id) {
        this.setState({ isAddFormEdited: false });
      }
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
    this.setState({ subjectBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    this.setState({ isAddFormEdited: true });
    let subject = _.pick(this.state, ['title', 'code']);
    this.props.addSubject(subject);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'title',
            'code'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ title: '' });
        this.setState({ code: '' });
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ isAddFormEdited: false });
      }
      this.setState({ subjectBtnLoading: false });
    }, 2000);
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code: '',
      isAddFormEdited: false,
      errors: {},
      subjectBtnLoading: false
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    const { errors } = this.state;
    return (
      <tr>
        <td>
          <div className="field">
            <div className="control">
              <Input
                type="text"
                name="title"
                placeholder="Subject Name"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.title}
              </Help>
            )}
          </div>
        </td>
        <td>
          <div className="field">
            <div className="control">
              <Input
                type="text"
                name="code"
                placeholder="Course Code"
                value={this.state.code}
                onChange={this.onChange}
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.code}
              </Help>
            )}
          </div>
        </td>
        <td>
          {this.state.subjectBtnLoading ? (
            <ButtonAltSpinner color="#209CEE" />
          ) : (
            <Button
              style={{ margin: '3px 0' }}
              isColor="info"
              isOutlined
              disabled={!this.state.title || !this.state.code}
              onClick={this.handleAdd}
            >
              {this.state.subjectBtnLoading ? 'working...' : 'Add Subject'}
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, {
  addSubject,
  clearErrors
})(AddSubject);
