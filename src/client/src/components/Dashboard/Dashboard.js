import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appInit } from '../../redux/actions/init';

import NavBar from '../Navbar/Navbar';
import Spinner from '../common/Spinner';
import TabBar from './TabBar';

const Loading = () => (
  // Just use this component
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
);

class Dashboard extends Component {
  componentDidMount() {
    this.props.appInit();
  }
  render() {
    // const STORE = this.props.allRedux;
    // console.log(STORE);

    const { profile, loading } = this.props.profile;

    return loading ? (
      <Loading />
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
