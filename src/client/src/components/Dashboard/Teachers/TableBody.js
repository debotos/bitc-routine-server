import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableRow from './TableRow';
import AddTeacher from './AddTeacher';

class TableBody extends Component {
  render() {
    let teachers = this.props.teachers;
    // console.log(teachers);
    return (
      <tbody>
        <AddTeacher />
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            <p className="subtitle has-text-grey">
              <span aria-label="teacher" role="img">
                👮
              </span>{' '}
              Teachers{' '}
              <span aria-label="teacher" role="img">
                👮
              </span>
            </p>
          </td>
        </tr>
        {teachers && teachers.length > 0 ? (
          teachers.map((singleItem, index) => (
            <TableRow key={index} data={singleItem} />
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <p className="subtitle has-text-grey">
                No Teacher Available{' '}
                <span aria-label="sad" role="img">
                  😞
                </span>{' '}
                Add New{' '}
                <span aria-label="idea" role="img">
                  💡
                </span>
              </p>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.teachers.teachers
  };
};

export default connect(mapStateToProps, null)(TableBody);
