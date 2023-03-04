import React from 'react';
import "./ProjectCard.css";
const ProjectCard = (props) => {
    return (
        <div className="project_card">
            <div className="project_heading">
                <h2>{props.heading}</h2>
            </div>
            <div className="project_date">
                <h5>{props.date}</h5>
                <div className="line"></div>
            </div>
            <div className="project_details">
                <h4>Est. Time - {props.months}</h4>
                <h4>Price - {props.price}</h4>
                <h4>Level - {props.level}</h4>
            </div>

            <div className="project_desc">
                {props.desc}
            </div>
            <hr />
            <div className="project_link text-center  fs-4">
                View Project 
            </div>

        </div>
    )
}

export default ProjectCard