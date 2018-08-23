import React, { Component } from 'react';
import { Container, Columns, Column, Box } from 'bloomer';
import { Table } from 'react-data-components-bulma';
import { connect } from 'react-redux';

import { clearErrors } from '../../../redux/actions/profileActions';

import './routine.css';
import AddPeriod from './AddPeriod';

class Routine extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.routine) {
      console.log('Before', this.state.columns);
      this.setState({ columns: this.generateColumn(nextProps.routine) }, () => {
        console.log('After', this.state.columns);
      });
    }
  }
  componentWillMount = () => {
    for (let i = 0; i < this.state.days.length; i++) {
      this.state.RoutineData.push({
        id: i,
        day: this.state.days[i]
      });
    }
  };
  handlePeriodChange = data => {
    console.log(data);
  };

  // addColumn = () => {
  //   console.log('Adding a new column ...');
  //   // Add a new column
  //   let newColumnData = {
  //     title: 'time range',
  //     prop: 'period'
  //   };
  //   let currentColumns = this.state.columns;
  //   console.log('Old Columns ', currentColumns);
  //   let updatedColumns = [...currentColumns, newColumnData];
  //   console.log('New Columns ', updatedColumns);
  //   this.setState({ columns: updatedColumns });
  // };
  generateColumn = (argRoutine = null) => {
    let alwaysAlwaysHave = { title: 'Day', prop: 'day' };
    if (!argRoutine) {
      let routine = this.props.routine
        ? this.props.routine.map(singleItem => {
            return { title: singleItem.period, prop: singleItem.period };
          })
        : [];
      if (this.props.routine) {
        return [alwaysAlwaysHave, ...routine];
      }
      return [alwaysAlwaysHave];
    } else {
      let routine = argRoutine
        ? argRoutine.map(singleItem => {
            return { title: singleItem.period, prop: singleItem.period };
          })
        : [];
      if (argRoutine) {
        return [alwaysAlwaysHave, ...routine];
      }
      return [alwaysAlwaysHave];
    }
  };
  state = {
    days: ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu'], // This is not going to change [const]
    columns: this.generateColumn(),
    // periods: [], // @todo
    RoutineData: []
  };
  render() {
    // console.log(this.props.routine);
    return (
      <Container className="routine-container" isFluid>
        <Box style={{}}>
          <Columns isCentered>
            <Column className="routine-table-container">
              <Table
                className="table is-bordered is-narrow is-hoverable routine-table"
                style={{ fontSize: '14px' }}
                keys="id"
                dataArray={this.state.RoutineData}
                columns={this.state.columns}
              />{' '}
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
  };
};
export default connect(mapStateToProps, { clearErrors })(Routine);
