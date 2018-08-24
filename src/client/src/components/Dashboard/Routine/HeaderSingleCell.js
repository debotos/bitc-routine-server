import React, { Component } from 'react';
import {
  Help,
  Field,
  Label,
  PanelBlock,
  Control,
  Title,
  Input,
  Icon,
  PanelIcon,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  ModalCardBody,
  ModalCardFooter,
  ModalClose,
  ModalContent,
  Notification,
  Columns,
  Column,
  Box,
  Table,
  Button
} from 'bloomer';

import { connect } from 'react-redux';

import { clearErrors } from '../../../redux/actions/profileActions';
import { removeRoutinePeriod } from '../../../redux/actions/routineActions';
import Spinner from '../ButtonAltSpinner/ButtonAltSpinner';

class HeaderSingleCell extends Component {
  state = {
    showDeleteModel: false,
    deleteBtnLoading: false
  };
  render() {
    let header = this.props.data;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{header.period}</span>
        <span
          style={{
            display: 'flex'
          }}
        >
          <Button
            isColor="info"
            isOutlined
            isSize="small"
            style={{ marginRight: '5px' }}
          >
            Edit
          </Button>
          <Button
            isColor="danger"
            isOutlined
            isSize="small"
            onClick={() => this.setState({ showDeleteModel: true })}
          >
            <span className="icon is-small">
              <i className="fas fa-trash" />
            </span>
          </Button>
        </span>
        {/* delete confirm model */}

        <Modal isActive={this.state.showDeleteModel}>
          <ModalBackground />
          <ModalContent>
            <Notification isColor="danger">
              <Delete
                onClick={() => {
                  this.setState({ showDeleteModel: false });
                  this.props.clearErrors();
                  this.setState({ deleteBtnLoading: false });
                }}
              />
              <Column hasTextAlign="centered">
                <Title isSize={3}>
                  Delete the whole {header.period} period? Are you sure ?
                </Title>

                {this.state.deleteBtnLoading ? (
                  <Spinner color="#FFDD57" />
                ) : (
                  <Button
                    isColor="warning"
                    isOutlined
                    onClick={() => {
                      this.setState({ deleteBtnLoading: true });
                      setTimeout(() => {
                        this.props.removeRoutinePeriod(header._id);
                        this.props.clearErrors();
                        this.setState({ deleteBtnLoading: false });
                        this.setState({ showDeleteModel: false });
                        {
                          /* history.push('/'); */
                        }
                      }, 2000);
                    }}
                  >
                    Confirm Delete
                  </Button>
                )}
              </Column>
            </Notification>
          </ModalContent>
          <ModalClose />
        </Modal>
      </div>
    );
  }
}

export default connect(null, { clearErrors, removeRoutinePeriod })(
  HeaderSingleCell
);
