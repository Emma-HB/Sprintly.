import React, { useState } from 'react';
import './ParticipantPages.css';
//import service  from '../auth/auth-service';

import { useDrag, useDrop } from 'react-dnd';

const Prioritization = () => {

  const [ firstList, setFirstList ] = useState(() => [
    { 
      external_id: 'SCard ID',
      epic: 'Story Card Epic',
      summary : 'Story Card Summary',
      priority: 'Priority',
      estimation: 'Estimate'
    },
    {
      external_id: '0111',
      epic: 'Storage ',
      summary : 'Lorem ipsum ...',
      priority: 'High',
      estimation: '13'
    }
  ]);

  const [ secondList, setSecondList ] = useState([]);

  const [{ isOver }, addToSecondListRef ] = useDrop({
    accept: "firstListItem",
    collect: (monitor) => ({
      isOver: !!monitor.isOver() // isOver() returns true if there is a drag operation in progress
    })
  });

  const [{ isOver: isFirstListOver }, removeFromSecondListRef] = useDrop({
    accept: "secondListItem", 
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const movePlayer = (item) => {
    console.log('item', item );
    if (item && item.type === "firstListItem") {
      console.log('dragElement', item)
      //Accepting item of first list into the second list
      setSecondList((_secondList) => [..._secondList, firstList[item.index]]);
      setFirstList((_firstList) => _firstList.filter((_, idx) => idx !== item.index));
    } else {
      //Removing an item from second list
      setFirstList((_firstList) => [...firstList, secondList[item.index]]);
      setSecondList(_secondList => _secondList.filter((_, idx) => idx !== item.index));
    }

  };

  const dragHoverSecondListBG = isOver ? "background-warning" : "background-light";
  const dragHoverFirstListBG = isFirstListOver ? "background-warning" : "background-light";

  return (
      <div className="participant">
        <nav>
          <img src="" alt="Sprintly." />
        </nav>

        <section>

          <div className={`drag-column ${dragHoverFirstListBG}`}>
            <h4>Drag a Story Card...</h4>           
            <ul ref={removeFromSecondListRef}>
              {firstList.map((el, idx) => {
                return (
                  <DraggableItem key={idx} 
                    {...el}
                    // summary={el.summary}
                    // epic={el.epic}
                    // priority={el.priority}
                    // estimation={el.estimation}
                    // external_id={el.external_id}

                    index={idx}
                    itemType="firstListItem"
                    onDropPlayer={movePlayer}
                  />
                )
              })}
            </ul>
          </div>

          <div className="drop-column">
            <h4>...And Drop it based on its importance or urgency</h4>
            <ul ref={addToSecondListRef}>
              <li className={`drop-target-container ${dragHoverSecondListBG}`}>
                <p>1</p>
              </li>
              {secondList.map((el, idx) => {
                return (
                  <DraggableItem key={idx} 
                    {...el}
                    // summary={el.summary}
                    // epic={el.epic}
                    // priority={el.priority}
                    // estimation={el.estimation}
                    // external_id={el.external_id}

                    index={idx}
                    itemType="secondListItem"
                    onDropPlayer={movePlayer}
                  />
                )
              })}
            </ul>
          </div>

        </section>
      </div>
  )
};

const DraggableItem = ({ summary, epic, priority, estimation, external_id, index, itemType, onDropPlayer}) => {

  const [{ isDragging }, dragRef ] = useDrag({
    type: itemType,
    item: () => ({ index, type: itemType }), //item denotes the index position and the element type
    end: (item, monitor) => {
      // console.log(item, monitor)
      const dropResult = monitor.getDropResult();

      if(item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging() //collect method is like an event listener, it monitors whether the element is dragged an expose that information
    })
  })

  return (
    <li className="draggable-container" ref={dragRef}>
      <p>{summary}</p>
      <p>{epic}</p>
      <p>{priority}</p>
      <p>{estimation}</p>
      <p>{external_id}</p>
    </li>
  )
}

export default Prioritization;