import React, { Component } from 'react';
import { Table } from 'bloomer';

import TableBody from './TableBody';

export default class Teachers extends Component {
  render() {
    return (
      <div className="container has-text-centered">
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
      </div>
    );
  }
}

const markUP = () => (
  <div className="container has-text-centered">
    <div className="columns">
      <div className="column is-4 ">
        <h3 className="title has-text-grey">Register</h3>
        <p className="subtitle has-text-grey">Register a new admin account.</p>
        <div className="box">
          <form>{/* form elements */}</form>
        </div>
      </div>
      <div className="column">
        <h3 className="title has-text-grey">List of Admin's</h3>
        <p className="subtitle has-text-grey">
          Revoke access to remove someone
        </p>
        {/* teachers list */}
      </div>
    </div>
  </div>
);
