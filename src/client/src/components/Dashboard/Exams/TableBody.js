import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableRow from './TableRow';
import AddExam from './AddExam';

class TableBody extends Component {
  render() {
    let exams = this.props.exams;
    // console.log(exams);
    return (
      <tbody>
        <AddExam />
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            <p className="subtitle has-text-grey">
              <span
                style={{ color: '#e25822' }}
                aria-label="subject"
                role="img"
              >
                🔥
              </span>{' '}
              Total {exams && exams.length} Exams{' '}
              <span
                style={{ color: '#e25822' }}
                aria-label="subject"
                role="img"
              >
                🔥
              </span>
            </p>
          </td>
        </tr>
        {exams && exams.length > 0 ? (
          exams.map((singleItem, index) => (
            <TableRow key={index} data={singleItem} />
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <p className="subtitle has-text-grey">
                No Exam Scheduled{' '}
                <span aria-label="sad" role="img">
                  😃
                </span>{' '}
                Add New{' '}
                <span aria-label="idea" role="img">
                  😞
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
    exams: state.exams.exams
  };
};

export default connect(mapStateToProps, null)(TableBody);
