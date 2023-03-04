import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Feature from '../../components/Feature/Feature'
import Project from '../../components/Project/Project'


const Landing = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Feature/>
        <Project/>
        
        <div className="last_link text-center ">
                <a className="edit">View more Projects</a>
            </div>
    </div>
  )
}

export default Landing;