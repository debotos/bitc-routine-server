import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableRow from './TableRow';
import AddSubject from './AddSubject';

class TableBody extends Component {
  render() {
    let subjects = this.props.subjects;
    // console.log(subjects);
    return (
      <tbody>
        <AddSubject />
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            <p className="subtitle has-text-grey">
              <span aria-label="subject" role="img">
                📚
              </span>{' '}
              Total {subjects && subjects.length} Subjects{' '}
              <span aria-label="subject" role="img">
                📚
              </span>
            </p>
          </td>
        </tr>
        {subjects && subjects.length > 0 ? (
          subjects.map((singleItem, index) => (
            <TableRow key={index} data={singleItem} />
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <p className="subtitle has-text-grey">
                No Subject Available{' '}
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
    subjects: state.subjects.subjects
  };
};

export default connect(mapStateToProps, null)(TableBody);
