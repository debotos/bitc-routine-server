import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { deleteProfile } from '../../redux/actions/profileActions';
import { clearErrors } from '../../redux/actions/profileActions';
import {
  Help,
  Title,
  Button,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Box,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  ModalCardBody,
  ModalCardFooter
} from 'bloomer';

import './admin-list.css';
import defaultUserLogo from '../Navbar/defaultUser.png';

class OthersProfileList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  state = {
    modal: false,
    deleteUser: '',
    deleteUserName: '',
    errors: {},
    password: '',
    btn_loading: false
  };
  finalWork = () => {
    this.setState({ errors: {} });
    this.setState({ btn_loading: true });
    this.props.clearErrors();

    let data = {
      email: this.state.deleteUser,
      password: this.state.password
    };
    // console.log(data);
    this.props.deleteProfile(data, this.props.history);
    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not msg field that i tricked, coz sometimes errors have msg
            'password'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ modal: false });
        this.setState({ btn_loading: false });
        this.setState({ deleteUserName: '' });
        this.setState({ deleteUser: '' });
        this.setState({ password: '' });
      } else {
        this.setState({ btn_loading: false });
      }
    }, 3000); // Clean all fields value after 3 sec of submitting form
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    let { allprofile, me } = this.props;
    let renderList = [];
    if (allprofile) {
      if (allprofile.length > 0) {
        renderList = allprofile.filter(
          singleItem => singleItem.email !== me.email
        );
      }
    }
    // console.log(renderList);

    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>Admin's List</CardHeaderTitle>
        </CardHeader>
        <CardContent>
          {renderList &&
            (renderList.length > 0
              ? renderList.map((singleItem, index) => (
                  <Box key={index}>
                    <div
                      className="admin-list-wrapper"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                      }}
                    >
                      <div>
                        <img
                          style={{ pointerEvents: 'none', borderRadius: '50%' }}
                          height="64"
                          width="64"
                          src={
                            singleItem.img ? singleItem.img : defaultUserLogo
                          }
                          alt="Admin"
                        />
                      </div>
                      <div>
                        <Title style={{ marginBottom: 0 }} isSize={5}>
                          {singleItem.name}
                        </Title>
                        <Title isSize={6}>{singleItem.email}</Title>
                      </div>
                      <div className="admin-delete-btn">
                        <Button
                          id={singleItem.email}
                          name={singleItem.name}
                          onClick={e => {
                            this.props.clearErrors();
                            this.setState({ modal: true });
                            this.setState({ deleteUser: e.target.id });
                            this.setState({ deleteUserName: e.target.name });
                          }}
                          isColor="danger"
                        >
                          Revoke Access
                        </Button>
                      </div>
                    </div>

                    <Modal isActive={this.state.modal}>
                      <ModalBackground />
                      <ModalCard>
                        <ModalCardHeader>
                          <ModalCardTitle>
                            {this.state.deleteUserName} Password :
                          </ModalCardTitle>
                          <Delete
                            onClick={() => {
                              this.props.clearErrors();
                              this.setState({ password: '' });
                              this.setState({ errors: {} });
                              this.setState({ modal: false });
                              this.setState({ btn_loading: false });
                              this.setState({ deleteUserName: '' });
                              this.setState({ deleteUser: '' });
                            }}
                          />
                        </ModalCardHeader>
                        <ModalCardBody>
                          {/* Content  */}
                          <div className="field">
                            <div className="control">
                              <input
                                style={{ fontWeight: 500 }}
                                name="password"
                                className="input is-large"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                placeholder={`${
                                  this.state.deleteUser
                                } password`}
                              />
                            </div>
                            <Help style={{ fontWeight: 500 }} isColor="danger">
                              {errors.password}
                            </Help>
                          </div>
                        </ModalCardBody>
                        <ModalCardFooter>
                          <Button
                            isLoading={this.state.btn_loading}
                            onClick={this.finalWork}
                            isColor="danger"
                          >
                            Delete
                          </Button>
                        </ModalCardFooter>
                      </ModalCard>
                    </Modal>
                  </Box>
                ))
              : 'Only You 👨‍ ')}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  allprofile: state.profile.profiles,
  me: state.profile.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { deleteProfile, clearErrors })(
  withRouter(OthersProfileList)
);
