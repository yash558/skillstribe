import React from 'react';
import "./RatingCard.css";
import { Link } from 'react-router-dom';
const RatingCard = (props) => {
    return (
        <div className="rating_card">
            <div className="rating_heading d-flex justify-content-between">
                <h2>{props.heading}</h2>
                <i class="uil uil-user-circle"></i>
            </div>
            <div className="rating_date">
                <h5>{props.date}</h5>
                <div className="line"></div>
            </div>
            <div className="rating_details">
                <h4 style={{fontSize:'25px'}}>Rating -                    
                        <i className="uil uil-star"></i>
                        <i className="uil uil-star"></i>
                        <i className="uil uil-star"></i>
                        <i className="uil uil-star"></i>
                        <i className="uil uil-star"></i>                    
                </h4>
                <h4 style={{fontSize:'25px'}}>Notifications - {props.price}</h4>
                <h4 style={{fontSize:'25px'}}>About Me - </h4>
            </div>

            <div className="rating_desc">
                {props.desc}
            </div>
            <hr />
            <div className="rating_link">
                <Link to="/myaccount" className="edit">Edit Profile</Link>
            </div>
            <hr className='line2' />
            <div className="post_link text-center">
                <a href={props.link} className="edit2">Post a Gig</a>
            </div>
        </div>
    )
}

export default RatingCard