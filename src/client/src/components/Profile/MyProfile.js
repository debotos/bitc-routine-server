import React, { Component } from 'react';
import { Button, Help, Notification, Delete, Title } from 'bloomer';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, clearErrors } from '../../redux/actions/profileActions';
import { logoutUser } from '../../redux/actions/authActions';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile.profile.name,
      email: this.props.profile.profile.email,
      img: this.props.profile.profile.img,
      cpassword: '',
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
      cpassword: this.state.cpassword,
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log('Update going to -> ', newUser);

    this.props.updateProfile(newUser, this.props.history);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not msg field that i tricked
            'name',
            'img',
            'email',
            'cpassword',
            'password',
            'password2'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({
          cpassword: '',
          password: '',
          password2: ''
        });
        this.props.logoutUser();
      }
    }, 3000); // Clean all fields value after 3 sec of submitting form
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="columns">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Your Profile</h3>
          <p className="subtitle has-text-grey">Update your profile details.</p>
          {errors.msg && (
            <Notification isColor="info">
              <Delete onClick={() => this.setState({ errors: {} })} />
              <Title isSize={6}>{errors.msg}</Title>
            </Notification>
          )}
          <Help style={{ fontWeight: 500 }} isColor="danger" />
          <div className="box">
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="name"
                    className="input is-large"
                    type="text"
                    placeholder="Your Name"
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
                    name="img"
                    className="input is-large"
                    type="text"
                    placeholder="Your Image URL"
                    autoFocus=""
                    value={this.state.img}
                    onChange={this.onChange}
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.img}
                </Help>
              </div>
              <p className="subtitle has-text-grey">
                Fill below fields only if you want to change password else don't
                touch them.
              </p>
              <div className="field">
                <div className="control">
                  <input
                    style={{ fontWeight: 500 }}
                    name="cpassword"
                    className="input is-large"
                    type="password"
                    value={this.state.cpassword}
                    onChange={this.onChange}
                    placeholder="Your Current password"
                  />
                </div>
                <Help style={{ fontWeight: 500 }} isColor="danger">
                  {errors.cpassword}
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
                    placeholder="New Password"
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
                    placeholder="Confirm New Password"
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
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {
  updateProfile,
  logoutUser,
  clearErrors
})(withRouter(MyProfile));
