import React, { Component } from 'react';
import { Control, Field, Checkbox, Button, Column } from 'bloomer';
import { connect } from 'react-redux';

import { clearErrors } from '../../../redux/actions/profileActions';
import { removeTeacher } from '../../../redux/actions/teacherActions';

class TableBody extends Component {
  render() {
    // console.log(this.props.teachers);
    let teachers = this.props.teachers;
    console.log(teachers);

    return (
      <tbody>
        <tr>
          <td>Ryu</td>
          <td>10000</td>
          <td>
            <Field>
              <Control>
                <Checkbox />
              </Control>
            </Field>
          </td>
          <td>
            <Button isColor="danger" isOutlined>
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.teachers.teachers
  };
};

export default connect(mapStateToProps, { removeTeacher, clearErrors })(
  TableBody
);
