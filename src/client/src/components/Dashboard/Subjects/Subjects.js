import React, { Component } from 'react';
import { Table, Container, Columns, Column, Box } from 'bloomer';

import TableBody from './TableBody';
import './subject.css';

export default class Subjects extends Component {
  render() {
    return (
      <Container isFluid>
        <Box>
          <Columns isCentered>
            <Column isSize="2/3" className="subject-table-container">
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
        </Box>
      </Container>
    );
  }
}
