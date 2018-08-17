import React, { Component } from 'react';
import { Button, Help, Notification, Delete, Title } from 'bloomer';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { clearErrors } from '../../redux/actions/profileActions';

class Register extends Component {
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
    this.props.registerUser(newUser, this.props.history);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not msg field that i tricked
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
    return (
      <section
        style={{
          background: '#F2F6FA',
          fontSize: '14px',
          fontWeight: 400
        }}
        className="hero is-fullheight"
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Register</h3>
              <p className="subtitle has-text-grey">
                Register a new admin account.
              </p>
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
                    Login
                  </Button>
                </form>
              </div>
              <p className="has-text-grey">
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/debotos.das.1997"
                  target="_blank"
                >
                  Forgot Password?
                </a>{' '}
                &nbsp;&nbsp;
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/debotos.das.1997"
                  target="_blank"
                >
                  Need Help?
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  withRouter(Register)
);
