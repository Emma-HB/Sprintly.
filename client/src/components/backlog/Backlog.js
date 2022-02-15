import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Backlog.css'; 



class Backlog extends Component {

    render() {
        return(
            <div>
                <section>
                    <div className='addStoryCards'>
                        <Link className="blue-btn" to={"/storycards/new"}>+ Create Story Card</Link>
                        <Link className="" to={"/storycards/import"}>+ Import from CSV</Link>
                    </div>
                    <div className='workWithStoryCards'>
                        <Link className="grey-btn" to={"/prioritizations"}>Launch Business Prioritisation</Link>
                        <Link className="grey-btn" to={"/"}>Start Sprint Planning</Link>
                    </div>

                </section>
                
            </div>
        )
    }

}

export default Backlog;