import React, { Component } from 'react';
import {
  Help,
  Field,
  Label,
  Control,
  Title,
  Input,
  Icon,
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
  Column,
  Button,
  Checkbox
} from 'bloomer';

import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import './routine.css';
import { clearErrors } from '../../../redux/actions/profileActions';
import {
  removeRoutinePeriod,
  updateRoutinePeriod
} from '../../../redux/actions/routineActions';
import Spinner from '../ButtonAltSpinner/ButtonAltSpinner';

const format = 'h:mm a';
const ShowError = ({ error }) =>
  error ? (
    <Help style={{ textAlign: 'center', fontWeight: 500 }} isColor="danger">
      <span
        aria-label="subject"
        role="img"
        style={{ fontWeight: 700, color: '#ff3860' }}
      >
        ✋
      </span>{' '}
      {error}
    </Help>
  ) : (
    ''
  );
class HeaderSingleCell extends Component {
  onStartChange = start => {
    // console.log(start);
    // console.log(start && start.format(format));
    this.setState({ start });
  };

  onEndChange = end => {
    // console.log(end);
    // console.log(end && end.format(format));
    this.setState({ end });
  };
  handleSerial = e => {
    this.setState({ errors: {} });
    this.setState({ serial: e.target.value });
  };
  handleReasonChange = e => {
    this.setState({ errors: {} });
    this.setState({ reason: e.target.value });
  };
  onBreakChange = e => {
    // console.log(e.target.checked, typeof e.target.checked);
    this.setState({ errors: {} });
    this.setState({ isBreak: e.target.checked });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.data) {
      if (nextProps.data.success) {
        // console.log('=> Got nextProps.data', nextProps.data);
        let propsUpdate = _.pick(nextProps.data, [
          '_id',
          'time',
          'break',
          'serial'
        ]);
        this.setState({ id: propsUpdate._id });
        this.setState({
          start: propsUpdate.time.start
            ? moment(propsUpdate.time.start)
            : moment()
                .hour(9)
                .minute(0)
        });
        this.setState({
          end: propsUpdate.time.end
            ? moment(propsUpdate.time.end)
            : moment()
                .hour(9)
                .minute(50)
        });
        this.setState({ serial: propsUpdate.serial });
        this.setState({ isBreak: propsUpdate.break.isBreak ? true : false });
        this.setState({
          reason: propsUpdate.break.msg ? propsUpdate.break.msg : ''
        });
      }
    }
  }
  state = {
    id: this.props.data._id ? this.props.data._id : '',
    showDeleteModel: false,
    deleteBtnLoading: false,
    showUpdateModal: false,
    errors: {},
    updatePeriodBtnLoading: false,
    start: this.props.data.time.start
      ? moment(this.props.data.time.start)
      : moment()
          .hour(9)
          .minute(0),
    end: this.props.data.time.end
      ? moment(this.props.data.time.end)
      : moment()
          .hour(9)
          .minute(50),
    serial: this.props.data.serial ? this.props.data.serial : '',
    isBreak: this.props.data.break.isBreak ? true : false,
    reason: this.props.data.break.msg ? this.props.data.break.msg : ''
  };
  handleUpdatePeriod = e => {
    e.preventDefault();
    this.setState({ updatePeriodBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let routinePeriod = _.pick(this.state, ['start', 'end']);
    let routinePeriodFinalName = `${this.state.start.format(
      format
    )} - ${this.state.end.format(format)}`;
    // console.log(this.state.serial, typeof this.state.serial);

    this.props.updateRoutinePeriod(this.state.id, {
      period: routinePeriodFinalName,
      time: routinePeriod,
      serial: parseInt(this.state.serial, 10),
      break: {
        isBreak: this.state.isBreak,
        msg: this.state.reason
      }
    });
    // console.log(routinePeriodFinalName);

    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'routinePeriod',
            'routineSerial',
            'serial',
            'period',
            'start',
            'end'
          ])
        ) === 0 // if error obj === 0 then clean else not
      ) {
        this.setState({ showUpdateModal: false });
        this.setState({ errors: {} });
        this.props.clearErrors();
      }
      // console.log(this.state.errors);
      this.setState({ updatePeriodBtnLoading: false });
    }, 3000);
  };
  render() {
    let header = this.props.data;
    // console.log(this.state.isBreak, typeof this.state.isBreak);
    // console.log(header._id);
    let { start, end, errors } = this.state;
    let startDate = start ? start.format(format) : '';
    let endDate = end ? end.format(format) : '';
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
            onClick={() => {
              this.setState({ showUpdateModal: true });
            }}
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
        {/* model to add a period */}
        <Modal isActive={this.state.showUpdateModal}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              {!this.state.updatePeriodBtnLoading ? (
                <ModalCardTitle>Update Period</ModalCardTitle>
              ) : (
                <ModalCardTitle>Please Wait ! Working...</ModalCardTitle>
              )}
              <Delete
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({ errors: {} });
                  this.setState({ updatePeriodBtnLoading: false });

                  this.setState({
                    serial: this.props.data.serial ? this.props.data.serial : ''
                  });
                  this.setState({
                    isBreak: this.props.data.break.isBreak ? true : false
                  });
                  this.setState({
                    reason: this.props.data.break.msg
                      ? this.props.data.break.msg
                      : ''
                  });

                  this.setState(
                    {
                      start: this.props.data.time.start
                        ? moment(this.props.data.time.start)
                        : undefined
                    },
                    () => {
                      this.setState(
                        {
                          end: this.props.data.time.end
                            ? moment(this.props.data.time.end)
                            : undefined
                        },
                        () => this.setState({ showUpdateModal: false })
                      );
                    }
                  );
                }}
              />
            </ModalCardHeader>
            <ModalCardBody className="custom-model-card">
              {/* Content  */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {this.props.data.time.start &&
                  this.props.data.time.end && (
                    <Title style={{ textAlign: 'center' }} isSize={5}>
                      Current Time{' '}
                      <span style={{ color: '#1ECD97' }}>
                        {moment(this.props.data.time.start).format(format)}
                      </span>{' '}
                      To{' '}
                      <span style={{ color: '#1ECD97' }}>
                        {moment(this.props.data.time.end).format(format)}
                      </span>
                      <hr />
                      Change To :
                    </Title>
                  )}
                {end &&
                  start && (
                    <Title style={{ textAlign: 'center' }} isSize={5}>
                      Start:{' '}
                      <span style={{ color: '#1ECD97' }}>{startDate}</span> End:{' '}
                      <span style={{ color: '#1ECD97' }}>{endDate}</span>
                      <br /> So Class Time{' '}
                      <span
                        style={{ color: '#1ECD97' }}
                        aria-label="subject"
                        role="img"
                      >
                        ⌛
                      </span>{' '}
                      <span style={{ color: '#1ECD97' }}>
                        {moment
                          .utc(
                            moment(end, 'HH:mm:ss').diff(
                              moment(start, 'HH:mm:ss')
                            )
                          )
                          .format('H[ hour(s)] m[ minute(s)]')}
                      </span>
                    </Title>
                  )}

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}
                >
                  <Field style={{ margin: '0 5px 0 0' }}>
                    <Label>Start At</Label>
                    <Control>
                      <TimePicker
                        showSecond={false}
                        value={this.state.start}
                        className="period-start"
                        onChange={this.onStartChange}
                        format={format}
                        use12Hours
                        inputReadOnly
                      />
                    </Control>
                    <ShowError error={errors.start} />
                  </Field>
                  <Field style={{ margin: '0 5px 0 0' }}>
                    <Label>End at</Label>
                    <Control>
                      <TimePicker
                        showSecond={false}
                        value={this.state.end}
                        className="period-end"
                        onChange={this.onEndChange}
                        format={format}
                        use12Hours
                        inputReadOnly
                      />
                    </Control>
                    <ShowError error={errors.end} />
                  </Field>
                </div>
                <ShowError error={errors.period} />
                <ShowError error={errors.routinePeriod} />
                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Field style={{ maxWidth: '30rem' }}>
                    {this.state.serial && (
                      <Help isColor="success">
                        "Example: put <strong>1</strong> to place this 'period
                        column' in the <strong>first position</strong> "
                      </Help>
                    )}
                    <Control hasIcons>
                      <Input
                        type="number"
                        isColor="success"
                        placeholder="Serial or Position e.g. 1"
                        value={this.state.serial}
                        onChange={this.handleSerial}
                      />
                      <Icon isSize="small" isAlign="left">
                        <span
                          className="fas fa-chart-line"
                          aria-hidden="true"
                        />
                      </Icon>
                      <Icon isSize="small" isAlign="right">
                        <span className="fa fa-check" aria-hidden="true" />
                      </Icon>
                    </Control>
                    <ShowError error={errors.serial} />
                    <ShowError error={errors.routineSerial} />
                  </Field>
                  {/* checkbox */}
                  {/* {console.log(this.state.isBreak, typeof this.state.isBreak)} */}
                  <Field>
                    <Label>Is It Break Time ?</Label>
                    <Control
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Checkbox
                        checked={this.state.isBreak}
                        onChange={this.onBreakChange}
                      >
                        {''}
                      </Checkbox>

                      <div
                        style={{ marginLeft: '1rem' }}
                        className="custom-check-box"
                      >
                        <input
                          type="checkbox"
                          checked={this.state.isBreak}
                          id="isBreak"
                          name="isBreak"
                          onChange={this.onBreakChange}
                        />
                        <label htmlFor="isBreak" />
                      </div>
                    </Control>
                  </Field>
                  {this.state.isBreak && (
                    <Field>
                      {this.state.reason && (
                        <Help isColor="success">
                          Reason / Cause for this break e.g. "LUNCH AND PRAYER
                          BREAK"
                        </Help>
                      )}
                      <Control hasIcons>
                        <Input
                          type="text"
                          isColor="info"
                          placeholder="Reason of Break"
                          value={this.state.reason}
                          onChange={this.handleReasonChange}
                        />
                        <Icon isSize="small" isAlign="left">
                          <span className="fas fa-comment" aria-hidden="true" />
                        </Icon>
                        <Icon isSize="small" isAlign="right">
                          <span className="fa fa-check" aria-hidden="true" />
                        </Icon>
                      </Control>
                      <Help isColor="danger">{errors.reason}</Help>
                    </Field>
                  )}
                </div>
              </div>
            </ModalCardBody>
            <ModalCardFooter>
              {this.state.updatePeriodBtnLoading ? (
                <div style={{ marginTop: '1.2rem' }}>
                  <Spinner color="#1ECD97" />
                </div>
              ) : (
                <Button
                  isColor="success"
                  onClick={this.handleUpdatePeriod}
                  disabled={
                    !this.state.serial ||
                    !start ||
                    !end ||
                    parseInt(start.valueOf(), 10) >=
                      parseInt(end.valueOf(), 10) ||
                    startDate.toString() === endDate.toString()
                  }
                >
                  Update Period
                </Button>
              )}
            </ModalCardFooter>
          </ModalCard>
        </Modal>
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

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, {
  clearErrors,
  removeRoutinePeriod,
  updateRoutinePeriod
})(HeaderSingleCell);
