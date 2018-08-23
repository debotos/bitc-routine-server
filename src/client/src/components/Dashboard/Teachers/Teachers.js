import React, { Component } from 'react';
import { Table, Container, Columns, Column, Box } from 'bloomer';

import TableBody from './TableBody';
import './teacher.css';

export default class Teachers extends Component {
  render() {
    return (
      <Container>
        <Box>
          <Columns isCentered>
            <Column isSize="2/3" className="teacher-table-container">
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
        </Box>
      </Container>
    );
  }
}
