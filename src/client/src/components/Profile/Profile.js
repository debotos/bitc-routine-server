import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../Navbar/Navbar';
import ProfileActions from './ProfileActions';
import { clearErrors } from '../../redux/actions/profileActions';
// import Spinner from '../common/Spinner';
import { history } from '../App';

class Profile extends Component {
  componentDidMount() {
    this.props.clearErrors();
    const { profile } = this.props.profile;
    if (profile === null) {
      history.push('/');
    }
  }

  render() {
    const { profile } = this.props.profile;
    if (profile === null) {
      return '';
    } else {
      return (
        <div>
          <NavBar user={profile} />
          <ProfileActions />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { clearErrors })(Profile);
