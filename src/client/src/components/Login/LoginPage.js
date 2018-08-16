import React, { Component } from 'react';
import { Button, Help } from 'bloomer';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { history } from '../App';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
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
              <h3 className="title has-text-grey">Login</h3>
              <p className="subtitle has-text-grey">Please login to proceed.</p>
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <div className="control">
                      <input
                        style={{ fontWeight: 500 }}
                        name="email"
                        className="input is-large"
                        type="email"
                        placeholder="Your Email"
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
                        name="password"
                        className="input is-large"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Your Password"
                      />
                    </div>
                    <Help style={{ fontWeight: 500 }} isColor="danger">
                      {errors.password}
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

export default connect(mapStateToProps, { loginUser })(LoginPage);
