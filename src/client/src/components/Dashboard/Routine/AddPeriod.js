import React, { Component } from 'react';
import {
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

class AddPeriod extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onStartChange = start => {
    // console.log(start);
    console.log(start && start.format(format));
    this.setState({ start });
  };

  onEndChange = end => {
    // console.log(end);
    console.log(end && end.format(format));
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

    this.props.addRoutinePeriod({
      period: routinePeriodFinalName,
      time: routinePeriod
    });
    console.log(routinePeriodFinalName);

    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'routinePeriod',
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
      errorMsg: false
    };
  }

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
          {/* model to add a period */}
        </div>
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
                  this.setState({ start: undefined });
                  this.setState({ end: undefined });
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
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}
                >
                  <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                    <Label>Start At</Label>
                    <Control>
                      <TimePicker
                        showSecond={false}
                        defaultValue={this.state.start}
                        className="period-start"
                        onChange={this.onStartChange}
                        format={format}
                        use12Hours
                        inputReadOnly
                      />
                    </Control>
                    <ShowError error={errors.start} />
                  </Field>
                  <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                    <Label>End at</Label>
                    <Control>
                      <TimePicker
                        showSecond={false}
                        defaultValue={this.state.end}
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
