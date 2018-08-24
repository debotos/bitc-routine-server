import React, { Component } from 'react';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';

import { clearErrors } from '../../../redux/actions/profileActions';
import SingleCellForm from './SingleCellForm';

class SingleCell extends Component {
  state = {
    errors: {}
  };
  render() {
    // console.log('SingleCell.js got ', this.props.data);
    return (
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {this.props.data.classes && (
            <SingleCellForm
              day={this.props.day}
              Period_ID={this.props.data.id}
            />
          )}
          {this.props.data.classes &&
            this.props.data.classes.length > 0 &&
            this.props.data.classes.map((singleClassItem, index) => (
              <span
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '2px'
                }}
              >
                <span>
                  {' '}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(singleClassItem.semester)
                    }}
                  />: ({singleClassItem.subject.code}) -{' '}
                  {singleClassItem.teacher.code}{' '}
                  {singleClassItem.teacher.guest && (
                    <span
                      style={{ color: '#ffd12d' }}
                      aria-label="subject"
                      role="img"
                    >
                      🌟
                    </span>
                  )}
                </span>

                <span>
                  <Button isColor="warning" isOutlined isSize="small">
                    <span className="icon is-small">
                      <i className="fas fa-trash" />
                    </span>
                  </Button>
                </span>
              </span>
            ))}
        </div>
      </td>
    );
  }
}

const mapStateToProps = state => {
  return {
    // routine: state.routine.routineArray,
    // semesters: state.semesters.semesterArray
  };
};
export default connect(mapStateToProps, { clearErrors })(SingleCell);
