import React from 'react'
import Carousel from 'better-react-carousel'
import ProjectCard from './../ProjectCard/ProjectCard';

const GigsCart = () => {
  return (
    <>
    <Carousel cols={3} rows={2} gap={1}>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      <Carousel.Item>
      <ProjectCard heading="Branding Design Guidelines" date="11/01/2023" months="7 months" price = "7000ALA" level="Expert" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
      </Carousel.Item>
      
      {/* ... */}
    </Carousel>

    </>
  )
}

export default GigsCart