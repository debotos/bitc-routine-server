import React, { Component } from 'react';
import { Columns, Column, Box, Table, Title } from 'bloomer';

import { connect } from 'react-redux';

import { clearErrors } from '../../../redux/actions/profileActions';

import './routine.css';
import AddPeriod from './AddPeriod';
import SingleCell from './SingleCell';
import HeaderSingleCell from './HeaderSingleCell';

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
          return <HeaderSingleCell key={index} data={singleItem} />;
        })
      : [];
    if (DataToWork) {
      return [alwaysAlwaysHave, ...routine];
    }
    return [alwaysAlwaysHave];
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.routine) {
      // console.log('Before', this.state.columns);
      this.setState({ columns: this.generateColumn(nextProps.routine) }, () => {
        // console.log('After', this.state.columns);
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
      routine.forEach(singlePeriod => {
        sat.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.sat
        });
        sun.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.sun
        });
        mon.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.mon
        });
        tues.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.tues
        });
        wed.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.wed
        });
        thu.push({
          id: singlePeriod._id,
          break: singlePeriod.break,
          ...singlePeriod.days.thu
        });
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
                isBordered
                isStriped
                isNarrow
                className="table is-hoverable routine-table"
                style={{ fontSize: '14px', marginBottom: '10rem' }}
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
                    {sat.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'sat'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return (
                          <td
                            style={{ textAlign: 'center' }}
                            rowSpan={'6'}
                            key={index}
                          >
                            <Title className="break-heading" isSize={1}>
                              Break
                            </Title>
                            <Title className="break-message" isSize={4}>
                              {singleCellData.break.msg}
                            </Title>
                          </td>
                        );
                      }
                    })}
                  </tr>
                  <tr>
                    <td>{days[1]}</td>
                    {sun.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'sun'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tr>
                  <tr>
                    <td>{days[2]}</td>
                    {mon.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'mon'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tr>
                  <tr>
                    <td>{days[3]}</td>
                    {tues.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'tues'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tr>
                  <tr>
                    <td>{days[4]}</td>
                    {wed.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'wed'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tr>
                  <tr>
                    <td>{days[5]}</td>
                    {thu.map((singleCellData, index) => {
                      if (!singleCellData.break.isBreak) {
                        return (
                          <SingleCell
                            day={'thu'}
                            data={singleCellData}
                            key={index}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
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
