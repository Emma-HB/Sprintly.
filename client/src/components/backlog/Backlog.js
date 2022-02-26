import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service'; 

import './Backlog.css'; 

import Navbar from '../Navbar';
import NewStorycard from './NewStorycards';


class Backlog extends Component {

    state = {
        projectName : "",
        listOfStoryCards : [], 
        selectedStoryCard: []
    };

    getProjectName = () => {
        service.get(`/projects/${this.props.match.params.id}`)

        .then(response => {
            console.log('Réponse', this.props)
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

    handleStoryCardsSubmit = () => {
        const selectedStoryCard = this.state.selectedStoryCard;

        service.post(('/prioritizations/'), { selectedStoryCard})
            .then( (response) => {
                console.log('Regarder la Réponse', response)
                this.props.history.push(`/prioritizations/new/${response.data._id}`)
            })
            .catch( error => console.log(error) )
    }

    componentDidMount() {
        this.getAllStoryCards();
        this.getProjectName();
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className='backlog'>
                    <section className='backlog-btns'>
                        <div className='addStoryCards'>
                            <Link className="blue-btn" to={`/storycards/new?project_id=${this.props.match.params.id}`}>+ Create Story Card</Link>
                            <Link className="" to={"/storycards/import"}>+ Import from CSV</Link>
                        </div>
                        <div className='workWithStoryCards'>
                            <button className="grey-btn" onClick={this.handleStoryCardsSubmit}>Launch Business Prioritisation</button>
                            <button className="grey-btn">Start Sprint Planning</button>
                            <Link className="grey-btn" to={"/prioritizations"}>Launch Business Prioritisation</Link>
                            <Link className="grey-btn" to={"/"}>Start Sprint Planning</Link>
                        </div>
                    </section>

                    <div>
                        <h3><a href='/dashboard'>All Projects</a> | {this.state.projectName}</h3>
                    </div>

                    <div className='backlog-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='table-col-small'><input type="checkbox" name="Select All" /></th>
                                    <th className='table-col-small'>ID</th>
                                    <th className='table-col-medium'>Epic</th>
                                    <th className='table-col-large'>Summary</th>
                                    <th className='table-col-medium'>Status</th>
                                    <th className='table-col-medium'>Priority</th>
                                    <th className='table-col-small'>Points</th>
                                    <th className='table-col-medium'>Sprint</th>
                                    <th className='table-col-small'>Del.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listOfStoryCards.map( storycard => {
                                    return(
                                        <tr key={storycard._id}>
                                            <td><input type="checkbox" name="Select" onClick={(e) => {
                                                console.log('Regarder mes SC', this.state.selectedStoryCard)
                                                if(e.target.checked === true ) {
                                                    this.state.selectedStoryCard.push(storycard._id)
                                                } else {
                                                    this.state.selectedStoryCard.splice(this.state.selectedStoryCard.findIndex(storyCard => storyCard === storycard._id), 1)
                                                }
                                            }}/></td>
                                            <td>{storycard.external_id}</td>
                                            <td>{storycard.epic}</td>
                                            <td>{storycard.summary}</td>
                                            <td>{storycard.status}</td>
                                            <td>{storycard.priority}</td>
                                            <td>{storycard.estimation}</td>
                                            <td>{storycard.sprint_label}</td>
                                            <td><img src={'/assets/trashIcon.png'} alt='Click to remove'/></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>

                    </div>
                </div>
                <div>
                <NewStorycard getData={() => this.getAllStoryCards()}/>
                </div>
                
                
            </div>
        )
    }

}

export default Backlog;

