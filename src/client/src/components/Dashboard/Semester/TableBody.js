import React, { Component } from 'react';
import DOMPurify from 'dompurify';

import TableRow from './TableRow';
import AddCourse from './AddCourse';

class TableBody extends Component {
  render() {
    let semester = this.props.data;
    // console.log(semester);
    return (
      <tbody>
        <AddCourse
          semsesterID={semester._id}
          semsesterCourses={semester.courses}
        />
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            <p className="subtitle has-text-grey">
              <span aria-label="subject" role="img">
                📚
              </span>{' '}
              Total {semester.courses && semester.courses.length} Subjects{' '}
              <span aria-label="subject" role="img">
                📚
              </span>{' '}
              in &nbsp;
              <span
                style={{ fontWeight: 700, color: '#1ECD97' }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(semester.name)
                }}
              />&nbsp;
            </p>
          </td>
        </tr>
        {semester.courses && semester.courses.length > 0 ? (
          semester.courses.map((singleItem, index) => (
            <TableRow key={index} SemesterID={semester._id} data={singleItem} />
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <p className="subtitle has-text-danger">
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

export default TableBody;
