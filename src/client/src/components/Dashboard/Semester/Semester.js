import React, { Component } from 'react';
import { Container, Notification, Columns, Column } from 'bloomer';
import {
  Panel,
  PanelHeading,
  PanelBlock,
  Control,
  Input,
  Icon,
  Checkbox,
  PanelIcon,
  Button
} from 'bloomer';

import AddSemester from './AddSemester';

export default class Semester extends Component {
  render() {
    return (
      <Container isFluid style={{ marginTop: 10 }}>
        <Columns>
          <Column isSize="1/3">
            <Panel>
              <PanelHeading>Add New Semester</PanelHeading>
              <AddSemester />
              <PanelHeading>List of All Semester</PanelHeading>
              <PanelBlock>
                <Control hasIcons="left">
                  <Input isSize="small" placeholder="Search" />
                  <Icon isSize="small" isAlign="left">
                    <span className="fa fa-search" aria-hidden="true" />
                  </Icon>
                </Control>
              </PanelBlock>
              {/* below render a Panel with search result */}
              <Panel>
                <PanelBlock isActive>
                  <PanelIcon className="fas fa-book-open" />
                  Bloomer
                </PanelBlock>
                <PanelBlock>
                  <PanelIcon className="fas fa-book-open" />
                  RxJS
                </PanelBlock>
                <PanelBlock>
                  <PanelIcon className="fas fa-book-open" />
                  Webpack
                </PanelBlock>
                <PanelBlock>
                  <PanelIcon className="fas fa-book-open" />
                  Typescript
                </PanelBlock>
                <PanelBlock tag="label">
                  <Checkbox> Remember me</Checkbox>
                </PanelBlock>
                <PanelBlock>
                  <Button isOutlined isFullWidth isColor="primary">
                    Reset all filters
                  </Button>
                </PanelBlock>
              </Panel>
            </Panel>
          </Column>
          <Column>
            <Notification isColor="info">
              This container is <strong>fluid</strong>: it will have a 20px gap
              on either side.
            </Notification>
          </Column>
        </Columns>
      </Container>
    );
  }
}
