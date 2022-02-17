import React, { Component } from 'react';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Prioritization from './Prioritization';


class ParticipantPages extends Component {
  render () {
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <Prioritization />
        </DndProvider>      
      </>
    )
  }
}

export default ParticipantPages;