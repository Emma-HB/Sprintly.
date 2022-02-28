import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

class ViewStoryCard extends Component {

    // componentDidMount(){
    //     this.getStoryCard();
    // };

    getStoryCard = () => {
        service.get(`/storycards/`)
        .then( (storyCardFromDB) => {
        console.log("Regarder les props", this.props )
        console.log("Regarder la storyCard", storyCardFromDB )
        
        const theStoryCard = storyCardFromDB.data;
        this.setState(theStoryCard);
        })
        .catch((err)=>{
            console.log('Error while fetching Story Card', err)
          })
    }

    render() {
        return (this.props.trigger) ? (
          <div className='popinEdit-background'>
            <div className='popinEdit-inner'>
              <h3>Story Card Details</h3>
              <p>{ this.props.storycardID }</p>
  
            </div>            
          </div>
        ) : "";
      }
    
};

    

export default ViewStoryCard;