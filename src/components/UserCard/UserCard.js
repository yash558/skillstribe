import React from 'react'
import './UserCard.css'
const UserCart = (props) => {
    return (

        <div className="user_card">
            <div className="user_heading">
                <h2>{props.heading}</h2>
            </div>
            <div className="user_date">
                <h5>{props.date}</h5>
                <div className="line"></div>
            </div>
            <div className="user_details">
                <h4>Est. Time - {props.months}</h4>
                <h4>Price - {props.price}</h4>
                <h4>Level - {props.level}</h4>
            </div>

            <div className="user_desc">
                {props.desc}
            </div>
            <hr />
            <div className="proposals d-flex gap-5">
                <div className="proposal_1">
                    <p>{props.prop1}</p>
                    <h5>Proposal</h5>
                </div>
                <div className="proposal_1">
                    <p>{props.prop2}</p>
                    <h5>Hired</h5>
                </div>
                <div className="proposal_1">
                   <p className='stat'> <div className="status"></div></p>
                    <h5>Status</h5>
                </div>
            </div>
            <div className="user_link text-center fw-bold fs-4">
                {/* <a href={props.link}>View Project</a> */}
                View Project
            </div>

        </div>
    )
}


export default UserCart