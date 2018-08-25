import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Content,
  Column,
  Columns,
  Table
} from 'bloomer';
import DOMPurify from 'dompurify';

import TableBody from './TableBody';
import './semester.css';

export default class Courses extends Component {
  render() {
    let semester = this.props.data;
    // console.log(semester);
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>
            Manage Subjects Under&nbsp;
            <span
              style={{ fontWeight: 700, color: '#1ECD97' }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(semester.name)
              }}
            />&nbsp;
            <span
              aria-label="subject"
              role="img"
              style={{ fontWeight: 700, color: '#1ECD97' }}
            >
              📚
            </span>
          </CardHeaderTitle>
        </CardHeader>
        <CardContent>
          <Content>
            <Columns isCentered>
              <Column
                style={{ minHeight: '70vh' }}
                className="course-table-container"
              >
                <Table isBordered isStriped isNarrow>
                  <thead>
                    <tr>
                      <th>Subject </th>
                      <th>Teacher </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <TableBody data={semester} />
                </Table>
              </Column>
            </Columns>
          </Content>
        </CardContent>
      </Card>
    );
  }
}
