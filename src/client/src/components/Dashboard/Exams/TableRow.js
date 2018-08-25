import React, { Component } from 'react';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DOMPurify from 'dompurify';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { clearErrors } from '../../../redux/actions/profileActions';
import { removeExam } from '../../../redux/actions/examActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

class TableRow extends Component {
  handleDelete = () => {
    this.setState({ deleteBtnLoading: true });
    setTimeout(() => {
      this.props.removeExam(this.props.data._id);
    }, 800);
    setTimeout(() => {
      this.props.clearErrors();
      this.setState({ deleteBtnLoading: false });
    }, 1000);
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteBtnLoading: false
    };
  }
  render() {
    return (
      <tr>
        <td style={{ minWidth: '11.2rem' }}>
          <div className="field">
            <div className="control">
              <Select
                disabled={true}
                value={
                  this.props.data.semesters
                    ? this.props.data.semesters.map(singleItem => ({
                        value: `${singleItem}`,
                        label: (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(`${singleItem}`)
                            }}
                          />
                        )
                      }))
                    : []
                }
                multi={true}
                readOnly
              />
            </div>
          </div>
        </td>
        <td style={{ minWidth: '11.2rem' }}>
          <div className="field">
            <div className="control">
              {/* firstmid time */}
              <DatePicker
                className="input is-info"
                selected={moment(this.props.data.firstmid)}
                readOnly={true}
                // dateFormat="LL"
                dateFormat="DD/MM/YYYY"
              />
            </div>
          </div>
        </td>
        <td style={{ minWidth: '11.2rem' }}>
          <div className="field">
            <div className="control">
              {/* finalmid time */}
              <DatePicker
                className="input is-info"
                selected={moment(this.props.data.finalmid)}
                readOnly={true}
                // dateFormat="LL"
                dateFormat="DD/MM/YYYY"
              />
            </div>
          </div>
        </td>
        <td style={{ minWidth: '11.2rem' }}>
          <div style={{ display: 'flex' }}>
            {this.state.deleteBtnLoading ? (
              <ButtonAltSpinner color=" #FF3860" />
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
    exams: state.exams.exams
  };
};

export default connect(mapStateToProps, {
  removeExam,
  clearErrors
})(TableRow);
