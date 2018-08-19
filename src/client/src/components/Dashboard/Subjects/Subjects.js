import React, { Component } from 'react';
import { Button } from 'bloomer';

export default class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  render() {
    return (
      <div>
        <Button
          isColor="info"
          isOutlined
          isLoading={this.state.loading}
          onClick={() => this.setState({ loading: true })}
        >
          show loading
        </Button>
      </div>
    );
  }
}
