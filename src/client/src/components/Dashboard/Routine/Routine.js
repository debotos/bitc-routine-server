import React, { Component } from 'react';
import { Columns, Column, Box, Table, Button } from 'bloomer';
import { connect } from 'react-redux';

import { clearErrors } from '../../../redux/actions/profileActions';

import './routine.css';
import AddPeriod from './AddPeriod';
import SingleCell from './SingleCell';

class Routine extends Component {
  generateColumn = (argRoutine = null) => {
    let alwaysAlwaysHave = (
      <p>
        <span>Day</span>
      </p>
    );
    let DataToWork;
    if (argRoutine) {
      DataToWork = argRoutine;
    } else {
      DataToWork = this.props.routine;
    }

    let routine = DataToWork
      ? DataToWork.map((singleItem, index) => {
          return (
            <p
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{singleItem.period}</span>
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
                <Button isColor="danger" isOutlined isSize="small">
                  <span className="icon is-small">
                    <i className="fas fa-trash" />
                  </span>
                </Button>
              </span>
            </p>
          );
        })
      : [];
    if (DataToWork) {
      return [alwaysAlwaysHave, ...routine];
    }
    return [alwaysAlwaysHave];
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.routine) {
      console.log('Before', this.state.columns);
      this.setState({ columns: this.generateColumn(nextProps.routine) }, () => {
        console.log('After', this.state.columns);
      });
      this.generateCellData(nextProps.routine);
    }
  }

  generateCellData = (argData = null) => {
    let routine;
    if (argData) {
      routine = argData;
    } else {
      routine = this.props.routine;
    }
    let sat = [],
      sun = [],
      mon = [],
      tues = [],
      wed = [],
      thu = [];

    if (routine) {
      routine.map(singlePeriod => {
        sat.push(singlePeriod.days.sat);
        sun.push(singlePeriod.days.sun);
        mon.push(singlePeriod.days.mon);
        tues.push(singlePeriod.days.tues);
        wed.push(singlePeriod.days.wed);
        thu.push(singlePeriod.days.thu);
      });
    }

    this.setState({ sat });
    this.setState({ sun });
    this.setState({ mon });
    this.setState({ tues });
    this.setState({ wed });
    this.setState({ thu });
  };

  componentWillMount() {
    this.generateCellData();
  }

  state = {
    days: ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu'], // This is not going to change [const]
    columns: this.generateColumn(),
    // periods: [], // @todo
    RoutineData: [],
    sat: [],
    sun: [],
    mon: [],
    tues: [],
    wed: [],
    thu: []
  };

  render() {
    // console.log(this.props.semester);
    let { days, sat, sun, mon, tues, wed, thu } = this.state;
    return (
      <div style={{ margin: '0 1rem' }} className="routine-container">
        <Box>
          <Columns isCentered>
            <Column
              style={{ minHeight: '80vh' }}
              className="routine-table-container"
            >
              <Table
                className="table is-bordered is-narrow is-hoverable routine-table"
                style={{ fontSize: '14px' }}
              >
                <thead>
                  <tr>
                    {/* generating columns */}
                    {this.state.columns.map((singleColumn, index) => (
                      <th key={index}>{singleColumn}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{days[0]}</td>
                    {sat.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                  <tr>
                    <td>{days[1]}</td>
                    {sun.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                  <tr>
                    <td>{days[2]}</td>
                    {mon.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                  <tr>
                    <td>{days[3]}</td>
                    {tues.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                  <tr>
                    <td>{days[4]}</td>
                    {wed.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                  <tr>
                    <td>{days[5]}</td>
                    {thu.map((singleCellData, index) => (
                      <SingleCell data={singleCellData} key={index} />
                    ))}
                  </tr>
                </tbody>
              </Table>
            </Column>
          </Columns>
        </Box>

        {/* floating button */}
        <AddPeriod />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    routine: state.routine.routineArray
    // semesters: state.semesters.semesterArray
  };
};
export default connect(mapStateToProps, { clearErrors })(Routine);
