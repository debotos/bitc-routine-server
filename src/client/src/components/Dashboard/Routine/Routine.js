import React, { Component } from 'react';
import { Container, Columns, Column, Box, Table, Button } from 'bloomer';
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
    if (!argRoutine) {
      let routine = this.props.routine
        ? this.props.routine.map((singleItem, index) => {
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
      if (this.props.routine) {
        return [alwaysAlwaysHave, ...routine];
      }
      return [alwaysAlwaysHave];
    } else {
      let routine = argRoutine
        ? argRoutine.map((singleItem, index) => {
            return (
              <p
                key={index}
                style={{ display: 'flex', justifyContent: 'space-between' }}
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
      if (argRoutine) {
        return [alwaysAlwaysHave, ...routine];
      }
      return [alwaysAlwaysHave];
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.routine) {
      console.log('Before', this.state.columns);
      this.setState({ columns: this.generateColumn(nextProps.routine) }, () => {
        console.log('After', this.state.columns);
      });
    }
  }

  state = {
    days: ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu'], // This is not going to change [const]
    columns: this.generateColumn(),
    // periods: [], // @todo
    RoutineData: [],
    sat: [
      {
        day: 'saturday',
        classes: [
          {
            subject: {
              title: 'Compailer Design',
              code: '023'
            },
            teacher: {
              guest: true,
              name: 'Majida Mam',
              code: 'MM'
            },
            _id: '5b7e7d284c30dc0523562013',
            semester: 'CSE- 7<sup>th</sup>'
          }
        ]
      }
    ],
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
      <Container className="routine-container" isFluid>
        <Box style={{}}>
          <Columns isCentered>
            <Column className="routine-table-container">
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
                    {sun.map((singleCell, index) => (
                      <td key={index}>{singleCell}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{days[2]}</td>
                    {mon.map((singleCell, index) => (
                      <td key={index}>{singleCell}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{days[3]}</td>
                    {tues.map((singleCell, index) => (
                      <td key={index}>{singleCell}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{days[4]}</td>
                    {wed.map((singleCell, index) => (
                      <td key={index}>{singleCell}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{days[5]}</td>
                    {thu.map((singleCell, index) => (
                      <td key={index}>{singleCell}</td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </Column>
          </Columns>
        </Box>

        {/* floating button */}
        <AddPeriod />
      </Container>
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
