import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableRow from './TableRow';
import AddTeacher from './AddTeacher';

class TableBody extends Component {
  render() {
    let teachers = this.props.teachers;
    let guest = 0;
    teachers.forEach(singleItem => {
      if (singleItem.guest) {
        guest++;
      }
    });
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
              Total {teachers && teachers.length} Teachers & Guest: {guest}{' '}
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
