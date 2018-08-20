import React, { Component } from 'react';
import {
  PanelBlock,
  Control,
  Input,
  Icon,
  Button,
  Field,
  Label,
  Help
} from 'bloomer';
import Spinner from '../ButtonAltSpinner/ButtonAltSpinner';

export default class AddSemester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <PanelBlock className="add-semester-wrapper">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Help
            style={{ textAlign: 'center', fontWeight: 500 }}
            isColor="danger"
          >
            This name is already used !
          </Help>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Section</Label>
              <Control hasIcons>
                <Input isColor="success" placeholder="CSE" value="" />
                <Icon isSize="small" isAlign="left">
                  <span className="fas fa-book-open" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Level</Label>
              <Control hasIcons>
                <Input isColor="success" placeholder="5" value="" />
                <Icon isSize="small" isAlign="left">
                  <span
                    className="fas fa-sort-numeric-down"
                    aria-hidden="true"
                  />
                </Icon>
              </Control>
            </Field>
            <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
              <Label>Superscript</Label>
              <Control hasIcons>
                <Input isColor="success" placeholder="th" value="" />
                <Icon isSize="small" isAlign="left">
                  <span className="fas fa-superscript" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            {this.state.loading ? (
              <div style={{ marginTop: '1.2rem' }}>
                <Spinner color="#1ECD97" />
              </div>
            ) : (
              <Button isColor="success">Add</Button>
            )}
          </div>
          <Help isColor="info" style={{ textAlign: 'center', fontWeight: 500 }}>
            Example: Section: <strong>CSE</strong> | Level: <strong>5</strong> |
            Superscript: <strong>th</strong>
            <span aria-label="subject" role="img">
              {' '}
              😎
            </span>
          </Help>
        </div>
      </PanelBlock>
    );
  }
}
