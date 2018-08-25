import React, { Component } from 'react';
import { Table, Container, Columns, Column, Box } from 'bloomer';

import TableBody from './TableBody';
import './teacher.css';

export default class Teachers extends Component {
  render() {
    return (
      <Container isFluid>
        <Box>
          <Columns isCentered>
            <Column
              style={{ minHeight: '80vh' }}
              className="teacher-table-container"
            >
              <Table isBordered isStriped isNarrow className="is-fullwidth">
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
