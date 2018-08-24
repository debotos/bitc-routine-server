import React, { Component } from 'react';
import {
  Icon,
  Input,
  Help,
  Field,
  Label,
  Control,
  Button,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  Title,
  ModalCardBody,
  ModalCardFooter
} from 'bloomer';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { addRoutinePeriod } from '../../../redux/actions/routineActions';

import addIcon from '../../../assets/add.png';
import './routine.css';
import { clearErrors } from '../../../redux/actions/profileActions';
import ButtonAltSpinner from '../ButtonAltSpinner/ButtonAltSpinner';

const format = 'h:mm a';

export const ShowError = ({ error }) =>
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

class AddPeriod extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
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

  handleAddPeriod = e => {
    e.preventDefault();
    this.setState({ addPeriodBtnLoading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let routinePeriod = _.pick(this.state, ['start', 'end']);
    let routinePeriodFinalName = `${this.state.start.format(
      format
    )} - ${this.state.end.format(format)}`;
    // console.log(this.state.serial, typeof this.state.serial);

    this.props.addRoutinePeriod({
      period: routinePeriodFinalName,
      time: routinePeriod,
      serial: parseInt(this.state.serial, 10),
      break: {
        isBreak: this.state.break,
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
        this.setState({
          start: moment()
            .hour(9)
            .minute(0)
        });
        this.setState({
          end: moment()
            .hour(9)
            .minute(50)
        });
        this.setState({ modal: false });
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ reason: '' });
        this.setState({ serial: '' });
        this.setState({ break: false });
      }
      this.setState({ addPeriodBtnLoading: false });
    }, 3000);
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      start: moment()
        .hour(9)
        .minute(0),
      end: moment()
        .hour(9)
        .minute(50),
      modal: false,
      addPeriodBtnLoading: false,
      errorMsg: false,
      serial: '',
      break: false,
      reason: ''
    };
  }
  handleSerial = e => {
    this.setState({ errors: {} });
    this.setState({ serial: e.target.value });
  };
  handleReasonChange = e => {
    this.setState({ errors: {} });
    this.setState({ reason: e.target.value });
  };
  onBreakChange = e => {
    // console.log(e.target.checked);
    this.setState({ errors: {} });
    this.setState({ break: e.target.checked });
  };
  render() {
    // console.log(this.state.start.format(format), this.state.end.format(format));
    let { start, end, errors } = this.state;
    // if (parseInt(start.valueOf()) > parseInt(end.valueOf())) {
    //   console.log('Start Big', start.valueOf(), end.valueOf());
    // }
    let startDate = start ? start.format(format) : '';
    let endDate = end ? end.format(format) : '';
    return (
      <div>
        <div id="container-floating">
          <div
            id="floating-button"
            data-toggle="tooltip"
            data-placement="left"
            data-original-title="New period"
            onClick={() => {
              this.setState({ modal: true });
            }}
          >
            <p className="plus">+</p>
            <img className="edit" alt="Add period" src={addIcon} />
          </div>
        </div>
        {/* model to add a period */}
        <Modal isActive={this.state.modal}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              {!this.state.addPeriodBtnLoading ? (
                <ModalCardTitle>Add New Period</ModalCardTitle>
              ) : (
                <ModalCardTitle>Please Wait ! Working...</ModalCardTitle>
              )}
              <Delete
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({ errors: {} });
                  this.setState({ modal: false });
                  this.setState({ addPeriodBtnLoading: false });
                  this.setState({ errorMsg: false });
                  this.setState({
                    start: moment()
                      .hour(9)
                      .minute(0)
                  });
                  this.setState({
                    end: moment()
                      .hour(9)
                      .minute(50)
                  });
                  this.setState({ reason: '' });
                  this.setState({ serial: '' });
                  this.setState({ break: false });
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
                  <Field>
                    <Label>Is It Break Time ?</Label>
                    <Control
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div className="custom-check-box">
                        <input
                          type="checkbox"
                          checked={this.state.break}
                          id="break"
                          name="break"
                          onChange={this.onBreakChange}
                        />
                        <label htmlFor="break" />
                      </div>
                    </Control>
                  </Field>
                  {this.state.break && (
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
              {this.state.addPeriodBtnLoading ? (
                <div style={{ marginTop: '1.2rem' }}>
                  <ButtonAltSpinner color="#1ECD97" />
                </div>
              ) : (
                <Button
                  isColor="success"
                  onClick={this.handleAddPeriod}
                  disabled={
                    !this.state.serial ||
                    !start ||
                    !end ||
                    parseInt(start.valueOf(), 10) >=
                      parseInt(end.valueOf(), 10) ||
                    startDate.toString() === endDate.toString()
                  }
                >
                  Add New Period
                </Button>
              )}
            </ModalCardFooter>
          </ModalCard>
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
export default connect(mapStateToProps, { clearErrors, addRoutinePeriod })(
  AddPeriod
);
