import React, { Component } from 'react';
import { Button, Help, Notification, Delete, Title } from 'bloomer';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import OthersProfileList from './OthersProfileList';
import { clearErrors } from '../../redux/actions/profileActions';
import { createProfile } from '../../redux/actions/profileActions';

class OthersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      img: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.props.clearErrors();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      img: this.state.img,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.createProfile(newUser, this.props.history);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'name',
            'img',
            'email',
            'password',
            'password2'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({
          name: '',
          email: '',
          img: '',
          password: '',
          password2: ''
        });
      }
    }, 3000); // Clean all fields value after 3 sec of submitting form
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    // console.log(this.props.allprofile);

    return (
      <div className="columns">
        <div className="column is-4 ">
          <h3 className="title has-text-grey">Register</h3>
          <p className="subtitle has-text-grey">
            Register a new admin account.
          </p>
          {errors.successMsg && (
            <Notification isColor="info">
              <Delete
                onClick={() => {
                  this.setState({ errors: {} });
                  this.props.clearErrors();
                }}
              />
              <Title isSize={6}>{errors.successMsg}</Title>
            </Notification>
          )}
          <div className="box">
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="name"
                    className="input is-large"
                    type="text"
                    placeholder="User Name"
                    autoFocus=""
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.name}
                </Help>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="email"
                    className="input is-large"
                    type="email"
                    placeholder="User Email"
                    autoFocus=""
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.email}
                </Help>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="img"
                    className="input is-large"
                    type="text"
                    placeholder="User Image URL"
                    autoFocus=""
                    value={this.state.img}
                    onChange={this.onChange}
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.img}
                </Help>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="password"
                    className="input is-large"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="User Password"
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.password}
                </Help>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="password2"
                    className="input is-large"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.password2}
                </Help>
              </div>

              <Button
                style={{ marginTop: '1.2rem', width: '100%' }}
                isColor="info"
                isSize="large"
                type="submit"
              >
                Add New Admin
              </Button>
            </form>
          </div>
        </div>
        <div className="column">
          <h3 className="title has-text-grey">List of Admin's</h3>
          <p className="subtitle has-text-grey">
            Revoke access to remove someone
          </p>
          <OthersProfileList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allprofile: state.profile.profiles,
  errors: state.errors
});

export default connect(mapStateToProps, {
  clearErrors,
  createProfile
})(withRouter(OthersProfile));
