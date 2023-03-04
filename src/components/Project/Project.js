import React from 'react'
import './Project.css'

import ProjectCart from './ProjectCart'
const Project = () => {
    return (
        <div className="project">
            <div className="project_heading ">
                <h1 className="text-center">Find Projects</h1>
                <div className="project_category">
                    <div className="category">
                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                    <p>|</p>
                    <div className="category_search">
                        <input type="search" placeholder='Search' />
                    </div>
                    <div className="category_right">
                        <p>|</p>
                        <h4>Filter</h4>
                        <p>|</p>
                        <h4>Budget</h4>
                    </div>

                </div>
            </div>
            <div className="project_detail">
                <ProjectCart/>
            </div>
 
        </div>
    )
}

export default Project