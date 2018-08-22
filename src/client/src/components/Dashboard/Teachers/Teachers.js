import React, { Component } from 'react';
import { Table, Container, Columns, Column } from 'bloomer';

import TableBody from './TableBody';
import './teacher.css';

export default class Teachers extends Component {
  render() {
    return (
      <Container>
        <Columns isCentered>
          <Column className="teacher-table-container" isSize="1/2">
            <Table isBordered isStriped isNarrow>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code Name</th>
                  <th>Guest</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <TableBody />
            </Table>
          </Column>
        </Columns>
      </Container>
    );
  }
}
