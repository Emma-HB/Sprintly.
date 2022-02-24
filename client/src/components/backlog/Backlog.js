import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service'; 

import Navbar from '../Navbar';

import './Backlog.css'; 
import NewStorycard from './NewStorycards';



class Backlog extends Component {

    state = {
        projectName : "",
        listOfStoryCards : []
    };

    getProjectName = () => {
        service.get(`/projects/${this.props.match.params.id}`)

        .then(response => {
            console.log("test", response.data)
            this.setState({
              projectName: response.data.title
            })
          })
    }

    getAllStoryCards = () => {
        service.get(('/storycards'))
            .then (responseFromAPI => {
                this.setState({
                    listOfStoryCards: responseFromAPI.data
                })
            })
            .catch(err => console.log('Error while fetching your Story Cards', err))
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
                                            <td><input type="checkbox" name="Select" /></td>
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

