import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import OthersProfile from './OthersProfile';
import MyProfile from './MyProfile';

class ProfileActions extends Component {
  render() {
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
            <MyProfile />
            {/* others */}
            <br />
            <OthersProfile />
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

export default connect(mapStateToProps, { registerUser })(
  withRouter(ProfileActions)
);
