import React, { Component } from 'react';
import { Help, Button, Input } from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';

import { clearErrors } from '../../../redux/actions/profileActions';
import {
  removeTeacher,
  updateTeacher
} from '../../../redux/actions/teacherActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class TableRow extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.errors.id) {
        if (nextProps.errors.id.toString() === this.state.id.toString()) {
          console.log(nextProps.errors.id.toString());
          console.log(this.state.id.toString());
          this.setState({ showWarnings: true });
        }
      } else {
        this.setState({ showWarnings: false });
      }
    }
    if (nextProps.data) {
      let propsUpdate = _.pick(nextProps.data, [
        '_id',
        'name',
        'code',
        'guest'
      ]);
      this.setState({ id: propsUpdate._id, ...propsUpdate });
      this.setState({
        updateBtnLoading: false,
        deleteBtnLoading: false,
        isEdited: false
      });
    }
  }
  onChange(e) {
    let value;
    if (e.target.name.toString() === 'guest') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    // console.log([e.target.name], value);
    this.setState({ [e.target.name]: value }, () => {
      if (
        this.state['name'].toString() === this.props.data['name'].toString() &&
        this.state['code'].toString() === this.props.data['code'].toString() &&
        this.state['guest'].toString() === this.props.data['guest'].toString()
      ) {
        this.setState({ isEdited: false });
      } else {
        this.setState({ isEdited: true });
      }
    });
    this.setState({ errors: {} });
  }
  handleDelete = () => {
    this.setState({ deleteBtnLoading: true });
    setTimeout(() => {
      this.props.clearErrors();
      this.props.removeTeacher(this.state.id);
    }, 1000);
  };
  handleUpdate = () => {
    this.setState({ updateBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let update = _.pick(this.state, ['name', 'code', 'guest']);
    this.props.updateTeacher(this.state.id, update);
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
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ isEdited: false });
      }
      this.setState({ updateBtnLoading: false });
    }, 2000);
  };
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data._id,
      name: this.props.data.name,
      code: this.props.data.code,
      guest: this.props.data.guest,
      isEdited: false,
      errors: {},
      updateBtnLoading: false,
      deleteBtnLoading: false,
      showWarnings: false
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    // let teacher = this.props.data;
    // console.log(teacher);

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
            {this.state.showWarnings && (
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
            {this.state.showWarnings && (
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
        <td style={{ minWidth: '11.2rem' }}>
          <div style={{ display: 'flex' }}>
            {this.state.isEdited &&
              (this.state.updateBtnLoading ? (
                <ButtonAltSpinner color="#FFDD57" />
              ) : (
                <Button
                  style={{ margin: '0 3px' }}
                  isColor="warning"
                  onClick={this.handleUpdate}
                  isOutlined
                >
                  {this.state.updateBtnLoading ? 'working...' : 'Update'}
                </Button>
              ))}
            {this.state.deleteBtnLoading ? (
              <ButtonAltSpinner color="#FF3860" />
            ) : (
              <Button isColor="danger" onClick={this.handleDelete} isOutlined>
                {this.state.deleteBtnLoading ? 'working...' : 'Delete'}
              </Button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    teachers: state.teachers.teachers
  };
};

export default connect(mapStateToProps, {
  removeTeacher,
  updateTeacher,
  clearErrors
})(TableRow);
