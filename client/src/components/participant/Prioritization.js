import './ParticipantPages.css';
import { useState, useRef, Component } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// import service  from '../auth/auth-service'; 

export default class Prioritization3 extends Component {

  state = {
    cardsFromDb: [
      { 
        _id: 'ffffggghhh',
        external_id: 'SCard ID',
        epic: 'Story Card Epic',
        summary : 'Story Card Summary',
        priority: 'Priority',
        estimation: 'Estimate'
      },
      { 
        _id: 'ggghhhkkkkkk',
        external_id: '01',
        epic: 'Story Card Epic',
        summary : 'Story Card Summary',
        priority: 'Priority',
        estimation: 'Estimate'
      },
      {
        _id: 'lllllmmmmmmm',
        external_id: '02',
        epic: 'Storage',
        summary : 'Lorem ipsum ipsam...',
        priority: 'Highest',
        estimation: '30'
      },
      {
        _id: '123lllllmmmmmmm',
        external_id: '02',
        epic: 'Storage BLABLABA',
        summary : 'Lorem ipsum ipsam...',
        priority: 'Highest',
        estimation: '55555'
      }
    ]
  }

  // getCardsFromDb = () => {
  //   service.get('/prioritizations/:id')
  //   .then(response => {
  //     this.setState({
  //       cardsFromDb: response.data
  //     })
  //   })
  // }
  
  // componentDidMount() {
  //   this.getCardsFromDb();
  // }

  render () {
    return (
      <>
        {this.state.cardsFromDb.length > 0 && (
          <Container 
            cards={this.state.cardsFromDb}
          />  
        )}
      </>
    )
  }
}

const Container = ({cards}) => {
  
  //Create columns and cards

  const cardsById = {}
  for (let i = 0; i < cards.length; i ++) {
    const card = cards[i]  
    cardsById[card._id] = card
  }

  const [ columns, setColumns ] = useState(() => [
    {
      id: 1,
      title: "Drag a Story Card...",
      className: "drag-column",
      cardIds: cards.map(card => card._id)
    },
    {
      id: 2,
      title: "...And Drop it based on its importance or urgency",
      className: "drop-column",
      cardIds: []
    }
  ]);

  //Update of columns after drag and drop
  const moveCard = (cardId, destColumnId, destColumnIndex) => {

    const newColumns = columns.map(column => {
      // 1) Remove the cardId for all columns
      let newCardIds = column.cardIds.filter(id => id !== cardId);

      // 2) If this is the destination column, insert the cardId.
      if (column.id === destColumnId) {
        column.cardIds = [...newCardIds.slice(0, destColumnIndex), cardId, ...newCardIds.slice(destColumnIndex)];
      } else {
        column.cardIds = newCardIds;
      }
      return column;
    });
    setColumns(newColumns);

    console.log(columns[1].cardIds)
  };

  return (
    <div className="participant">
      <nav>
        <img src="" alt="Sprintly." />
      </nav>

      <div className="participant-section">
        <div className="prioritization-container">
          {columns.map(column => (
              <Column
                key={column.id}
                title={column.title}
                className={column.className}
              >
                {column.cardIds.map((cardId, index) => (
                  <DraggableCard
                    {...cardsById[cardId]}
                    key={cardId}
                    id={cardId}
                    columnId={column.id}
                    columnIndex={index}
                    moveCard={moveCard}
                  />
                ))}
                {column.cardIds.length === 0 && (
                  <DraggableCard
                    isSpacer
                    moveCard={cardId => moveCard(cardId, column.id, 0)}
                  />
                )}
              </Column>
            ))}
        </div>

        <div><button className='prioritization-submit blue-btn'>Submit</button></div>

      </div>

    </div>
  )
}

//Column component
const Column = ({ title, className, children }) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};

//Card component
const DraggableCard = ({ summary, epic, priority, estimation, external_id, id, columnId, columnIndex, moveCard, isSpacer }) => {
  const ref = useRef(null)

  //Dragging
  const [{ isDragging }, connectDrag ] = useDrag({
    type: 'card',
    item: { id }, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging() 
    })
  });

  const dragging = isDragging ? "background-warning" : null

  //Dropping
  const [, connectDrop] = useDrop({
    accept: 'card',
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        moveCard(draggedId, columnId, columnIndex)
      }
    }  
  });

  connectDrag(ref)
  connectDrop(ref)

  return (
    (!isSpacer) 
    ? <div className={`draggable-container ${dragging}`} ref={ref}>
      <p>{summary}</p>
      <p>{epic}</p>
      <p>{priority}</p>
      <p>{estimation}</p>
      <p>{external_id}</p>
    </div>
    : <div className="drop-target-container" ref={ref}><p>Drop a card here</p></div>
  )
}