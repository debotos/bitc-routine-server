import React, { Component } from 'react';
import { Table, Container, Columns, Column, Title, Box } from 'bloomer';

import TableBody from './TableBody';
import './exam.css';

export default class Exams extends Component {
  render() {
    return (
      <Container isFluid>
        <Box>
          <Columns isCentered>
            <Column
              style={{ minHeight: '80vh' }}
              className="exam-table-container"
            >
              <Table isBordered isStriped isNarrow className="is-fullwidth">
                <thead>
                  <tr>
                    <td style={{ textAlign: 'center' }} colSpan={'4'}>
                      <Title isSize={4}>Mid Examination Date</Title>
                    </td>
                  </tr>
                  <tr>
                    <th>Semester</th>
                    <th>
                      1<sup>st</sup> Mid Date
                    </th>
                    <th>Final Mid Date</th>
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
