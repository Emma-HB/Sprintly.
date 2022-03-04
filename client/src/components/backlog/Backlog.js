import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service'; 

import './Backlog.css'; 

import Navbar from '../Navbar';
import NewStorycard from './NewStorycards';
import EditStoryCard from './EditStoryCard';

class Backlog extends Component {

  state = {
    projectName : "",
    listOfStoryCards : [], 
    selectedStoryCard: [],
    deleteStoryCard: "",
    showCreatePopin: false,
    showEditPopin: -1
  };

  getProjectName = () => {
    service.get(`/projects/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          projectName: response.data.title
        })
     })
  }

  getAllStoryCards = () => {
    service.get((`/storycards?project_id=${this.props.match.params.id}`))
      .then (responseFromAPI => {
        this.setState({
          listOfStoryCards: responseFromAPI.data
        })
      })
      .catch(err => console.log('Error while fetching your Story Cards', err))
  }

  showCreatePopin = () => {
    this.setState({showCreatePopin: !this.state.showCreatePopin});
  }

  showEditPopin = (num) => {
    this.setState({showEditPopin: num});
  }

  handleStoryCardsSubmit = () => {
    const selectedStoryCard = this.state.selectedStoryCard;
    if (selectedStoryCard.length > 1) {
      service.post(('/prioritizations/'), { selectedStoryCard, project_id: this.props.match.params.id})
      .then( (response) => {
        this.props.history.push(`/prioritizations/new/${response.data._id}`)
      })
      .catch( error => console.log(error) )
    }
  }

  handleStoryCardsDelete = (storycard_id) => {
    service.delete((`/storycards/${storycard_id}`))
      .then( () => {
        window.location.reload(false);
      })
      .catch( error => console.log(error) )
  } 

  componentDidMount() {
    this.getAllStoryCards();
    this.getProjectName();
  }

  render() {
    const prioActive = this.state.selectedStoryCard.length > 1
    return(
      <div>
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>
        <div className='full-page'>
          <section className='backlog-btns'>
            <div className='addStoryCards'>
              <button className="blue-btn" onClick={this.showCreatePopin}>+ Create Story Card</button>
              <NewStorycard 
                trigger = {this.state.showCreatePopin}
                hideCreatePopin={this.showCreatePopin}
                projectID = {this.props.match.params.id} 
              />
              <Link className="import-btn" to={"/storycards/import"}>+ Import from CSV</Link>
            </div>
            <div className='workWithStoryCards'>
              <button 
              className={prioActive ? 'blue-secondary-btn' : 'grey-btn'}
              onClick={this.handleStoryCardsSubmit}>Launch Prioritisation</button>
              <button className="grey-btn">Start Planning</button>
            </div>
          </section>
          <div>
            <h3><a href='/dashboard'>All Projects</a> | {this.state.projectName}</h3>
          </div>
          <div className='backlog-table'>
            <table>
              <thead>
                <tr>
                  <th className='table-col-small'>
                    {/* <input type="checkbox" name="Select All" /> */}
                  </th>
                  <th className='table-col-small'>ID</th>
                  <th className='table-col-medium'>Epic</th>
                  <th className='table-col-large'>Summary</th>
                  <th className='table-col-small'>Status</th>
                  <th className='table-col-small'>Priority</th>
                  <th className='table-col-small'>Points</th>
                  <th className='table-col-small'>Sprint</th>
                  <th className='table-col-small'>Del.</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listOfStoryCards.map( (storycard, index) => {
                  return(
                    <tr key={storycard._id}>
                      <td>
                        <input 
                          type="checkbox" 
                          name="Select" 
                          onClick={(e) => {
                            if (e.target.checked === true ) {
                                this.setState({selectedStoryCard : [...this.state.selectedStoryCard, storycard._id]})
                            } else {
                              const arrayselectedStoryCard = [...this.state.selectedStoryCard];
                              arrayselectedStoryCard.splice(arrayselectedStoryCard.findIndex(storyCard => storyCard === storycard._id), 1)
                              this.setState({selectedStoryCard : arrayselectedStoryCard})
                            }
                        }}/>
                      </td>
                      <td><button onClick={(e) => this.showEditPopin(index)}>{storycard.external_id}</button>
                      <EditStoryCard 
                        trigger = {this.state.showEditPopin === index}
                        hideEditPopin={this.showEditPopin}
                        storycardID = {storycard._id}
                        projectID = {storycard.project_id} />
                      </td>
                      <td>{storycard.epic}</td>
                      <td>{storycard.summary}</td>
                      <td>{storycard.status}</td>
                      <td>{storycard.priority}</td>
                      <td>{storycard.estimation}</td>
                      <td>{storycard.sprint_label}</td>
                      <td><button onClick={(e) => {this.handleStoryCardsDelete(storycard._id)}}>
                      <img src={'/assets/trashIcon.png'} alt='Click to remove'/>
                      </button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Backlog;