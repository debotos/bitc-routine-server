import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarBurger,
  NavbarStart,
  NavbarDropdown,
  Icon,
  NavbarMenu,
  NavbarLink,
  NavbarDivider,
  NavbarEnd,
  Container
} from 'bloomer';
import { connect } from 'react-redux';
import { history } from '../App';

import { logoutUser } from '../../redux/actions/authActions';
import defaultUserLogo from './defaultUser.png';
// import logo from './logo.png';
import './navbar.css';

class NavBar extends Component {
  state = { isActive: false };
  onClickNav = () => {
    this.setState(prevState => {
      return { isActive: !prevState.isActive };
    });
  };
  render() {
    return (
      <Navbar className="has-shadow is-fixed-top" style={{ margin: '0' }}>
        <Container>
          <NavbarBrand>
            <NavbarItem
              id="sitelogo"
              onClick={() => {
                // console.log(history);
                history.push('/');
              }}
            >
              <div className="logo" />
              {/* <img
                src={logo}
                style={{ marginRight: 5, pointerEvents: 'stroke' }}
                alt="BITC class routine CMS"
              /> */}
            </NavbarItem>
            <NavbarBurger
              isActive={this.state.isActive}
              onClick={this.onClickNav}
            />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarStart>
              {/* i don't have any menu item that now required */}
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink>
                  <img
                    style={{ pointerEvents: 'none' }}
                    className="user-img is-rounded"
                    src={
                      this.props.user
                        ? this.props.user.img
                          ? this.props.user.img
                          : defaultUserLogo
                        : defaultUserLogo
                    }
                    alt="BITC class routine CMS admin"
                  />
                </NavbarLink>
                <NavbarDropdown>
                  <NavbarItem
                    className="nav-user-option"
                    href="#/"
                    onClick={() => {
                      history.push('/profile');
                    }}
                  >
                    <span className="icon is-medium has-text-info">
                      <Icon className="fas fa-lg fa-user-circle" />
                    </span>
                    <span>Profile Actions</span>
                  </NavbarItem>
                  <NavbarItem
                    className="nav-user-option"
                    href="#/"
                    onClick={() => this.props.logoutUser()}
                  >
                    <span className="icon is-medium has-text-danger">
                      <Icon className="fas fa-lg fa-sign-out-alt" />
                    </span>
                    <span>Logout</span>
                  </NavbarItem>
                  <NavbarDivider />
                  <div
                    style={{
                      textAlign: 'center',
                      margin: '.5rem .5rem 0 .5rem'
                    }}
                  >
                    <strong>
                      {this.props.user
                        ? this.props.user.email ? this.props.user.email : ''
                        : ''}
                    </strong>
                  </div>
                </NavbarDropdown>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
