import React, { Component } from 'react';
import { Container, Columns, Column } from 'bloomer';
import { Table } from 'react-data-components-bulma';

import addIcon from '../../../assets/add.png';
import './routine.css';

export default class Routine extends Component {
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

  addColumn = () => {
    console.log('Adding a new column ...');
    // Add a new column
    let newColumnData = {
      title: 'time range',
      prop: 'period'
    };
    let currentColumns = this.state.columns;
    console.log('Old Columns ', currentColumns);
    let updatedColumns = [...currentColumns, newColumnData];
    console.log('New Columns ', updatedColumns);
    this.setState({ columns: updatedColumns });
  };
  state = {
    days: ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu'], // This is not going to change [const]
    columns: [{ title: 'Day', prop: 'day' }],
    // periods: [], // @todo
    RoutineData: []
  };
  render() {
    return (
      <Container className="routine-container" isFluid>
        <Columns isCentered>
          <Column className="routine-table-container">
            <Table
              className="table is-bordered is-narrow is-hoverable routine-table"
              style={{ fontSize: '14px' }}
              keys="id"
              dataArray={this.state.RoutineData}
              columns={this.state.columns}
            />
          </Column>
        </Columns>
        {/* floating button */}
        <div id="container-floating">
          <div
            id="floating-button"
            data-toggle="tooltip"
            data-placement="left"
            data-original-title="New period"
            onClick={this.addColumn}
          >
            <p className="plus">+</p>
            <img className="edit" alt="Add period" src={addIcon} />
          </div>
        </div>
      </Container>
    );
  }
}
