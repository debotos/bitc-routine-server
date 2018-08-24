import React, { Component } from 'react';
import { Button } from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';

import { clearErrors } from '../../../redux/actions/profileActions';
import { removeClass } from '../../../redux/actions/routineActions';

class SingleClassEntry extends Component {
  state = {
    errors: {},
    loading: false
  };
  handleDelete = e => {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({ loading: true });
    // console.log(
    //   'Removing Subject ',
    //   this.props.Period_ID,
    //   this.props.day,
    //   this.props.data._id
    // );
    setTimeout(() => {
      this.props.removeClass(
        this.props.Period_ID,
        this.props.day,
        this.props.data._id
      );
    }, 850);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };
  render() {
    let singleClassItem = this.props.data;
    // console.log(this.props);
    return (
      <div
        style={
          this.state.loading
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2px',
                border: '2px solid #ff0000',
                borderRadius: '3px',
                paddingLeft: '2px',
                backgroundColor: '#ff0000',
                opacity: '0.7',
                color: '#fff',
                transition: '.5s'
              }
            : {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2px',
                border: '2px solid #fff',
                borderRadius: '3px',
                paddingLeft: '2px'
              }
        }
      >
        <div>
          {' '}
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singleClassItem.semester)
            }}
          />
          <span>
            {' '}
            : ({singleClassItem.subject.code}) - {singleClassItem.teacher.code}{' '}
          </span>
          {singleClassItem.teacher.guest && (
            <span style={{ color: '#ffd12d' }} aria-label="subject" role="img">
              🌟
            </span>
          )}
        </div>

        <Button
          isColor="warning"
          isOutlined
          isSize="small"
          isLoading={this.state.loading}
          onClick={this.handleDelete}
          render={props => (
            <a {...props}>
              <i className="fas fa-trash" />
            </a>
          )}
        />
      </div>
    );
  }
}
export default connect(null, { clearErrors, removeClass })(SingleClassEntry);
