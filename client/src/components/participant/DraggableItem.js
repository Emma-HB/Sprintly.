import React, { Component } from 'react';

class DraggableItem extends Component {
  render () {
    return (
      <li className="draggable-container">
        <p>{this.props.summary}</p>
        <p>{this.props.epic}</p>
        <p>{this.props.priority}</p>
        <p>{this.props.estimation}</p>
        <p>{this.props.external_id}</p>
      </li>
    )
  }
}

export default DraggableItem;