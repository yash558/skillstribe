import React from 'react'
import Carousel from 'better-react-carousel'
import UserCard from '../UserCard/UserCard'


const ProjectCart = () => {
  return (
    <>
    <Carousel cols={2} rows={2} gap={1}>
      <Carousel.Item>
      <UserCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" prop1="2" prop2="4" prop3="6" />
      </Carousel.Item>
      <Carousel.Item>
      <UserCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" prop1="2" prop2="4" prop3="6" />
      </Carousel.Item>
      <Carousel.Item>
      <UserCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" prop1="2" prop2="4" prop3="6" />
      </Carousel.Item>
      <Carousel.Item>
      <UserCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" prop1="2" prop2="4" prop3="6" />
      </Carousel.Item>
      
      
      {/* ... */}
    </Carousel>

    </>
  )
}

export default ProjectCart