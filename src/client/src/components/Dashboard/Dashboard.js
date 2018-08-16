import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';

// import Blog from '../Blog/Blog';
// import Portfolio from '../Portfolio/Portfolio';
// import Porfile from '../Profile/Porfile';
// import NavBar from '../Navbar/Navbar';

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* <NavBar />
        <div style={{ marginTop: '55px' }} />
        <Switch>
          <Route exact={true} path="/dashboard" component={Porfile} />
          <Route path={`${this.props.match.path}/blog`} component={Blog} />
          <Route
            path={`${this.props.match.path}/portfolio`}
            component={Portfolio}
          />
          <Redirect to="/" />
        </Switch> */}
        Dashboard
      </div>
    );
  }
}

export default Dashboard;
