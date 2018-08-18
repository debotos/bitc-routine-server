import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appInit } from '../../redux/actions/init';

import NavBar from '../Navbar/Navbar';
import Spinner from '../common/Spinner';
import TabBar from './TabBar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.appInit();
  }
  render() {
    // const STORE = this.props.allRedux;
    const { profile, loading } = this.props.profile;

    return loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spinner />
      </div>
    ) : (
      <div>
        <NavBar user={profile} />
        <TabBar />
        {/* you can give footer here */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  allRedux: state
});

export default connect(mapStateToProps, { appInit })(Dashboard);
