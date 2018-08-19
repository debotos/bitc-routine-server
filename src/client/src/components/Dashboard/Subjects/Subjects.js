import React, { Component } from 'react';
import { Table, Container, Columns, Column } from 'bloomer';

import TableBody from './TableBody';

export default class Subjects extends Component {
  render() {
    return (
      <Container>
        <Columns isCentered>
          <Column isSize="1/2">
            <Table isBordered isStriped isNarrow>
              <thead>
                <tr>
                  <th>Subject Title</th>
                  <th>Course Code</th>
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
