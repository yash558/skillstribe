import React from 'react'

const Jobcard = (props) => {
    return (
        <div className='jobcard'>
            <div className="jobcard_left d-flex flex-column">
                <div className="jobcard_title">
                    <h2>{props.title}</h2>
                </div>
                <div className="jobs_desc">
                    <span className="jobs_price">Price: {props.price}</span>
                    <span>|</span>
                    <span className="jobs_level">Price: {props.price}</span>
                    <span>|</span>
                    <span className="jobs_time">Price: {props.price}</span>
                </div>
                <span>Posted on {props.date}</span>
            </div>
            <div className="jobcard_right">
                <div className="rating">

                </div>
                
            </div>
        </div>
    )
}

export default Jobcard