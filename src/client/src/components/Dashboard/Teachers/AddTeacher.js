import React, { Component } from 'react';
import { Help, Button, Input } from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';

import { clearErrors } from '../../../redux/actions/profileActions';
import { addTeacher } from '../../../redux/actions/teacherActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class AddTeacher extends Component {
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
    let value;
    if (e.target.name.toString() === 'guest') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    // console.log([e.target.name], value);
    this.setState({ [e.target.name]: value }, () => {
      this.setState({ isAddFormEdited: true });
    });
  }

  handleAdd = e => {
    e.preventDefault();
    this.setState({ teacherBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    this.setState({ isAddFormEdited: true });
    let teacher = _.pick(this.state, ['name', 'code', 'guest']);
    this.props.addTeacher(teacher);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'name',
            'code'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ name: '' });
        this.setState({ code: '' });
        this.setState({ guest: false });
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ isAddFormEdited: false });
      }
      this.setState({ teacherBtnLoading: false });
    }, 3000);
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      guest: false,
      isAddFormEdited: false,
      errors: {},
      teacherBtnLoading: false
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
                name="name"
                placeholder="Teacher Name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            {this.state.isAddFormEdited && (
              <Help style={{ fontWeight: 500 }} isColor="danger">
                {errors.name}
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
                placeholder="Code Name"
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
          <label>
            <input
              type="checkbox"
              name="guest"
              checked={this.state.guest}
              onChange={this.onChange}
            />
            <span>&nbsp;{this.state.guest ? 'Yes' : 'No'}</span>
          </label>
        </td>
        <td>
          {this.state.teacherBtnLoading ? (
            <ButtonAltSpinner color="#209CEE" />
          ) : (
            <Button
              style={{ margin: '3px 0' }}
              isColor="info"
              isOutlined
              disabled={!this.state.name || !this.state.code}
              onClick={this.handleAdd}
            >
              {this.state.teacherBtnLoading ? 'working...' : 'Add Teacher'}
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
  addTeacher,
  clearErrors
})(AddTeacher);
