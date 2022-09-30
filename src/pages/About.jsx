import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='about'>
      <h1>About</h1>
      <p>Developed and Designed by &nbsp;
        <strong>Mike Macfarland</strong>
        <br/>This SPA currently uses the &nbsp;
        <strong>
          <a target='blank'href="https://spoonacular.com/food-api">Spoontacular API</a>
        </strong> to generate content.
      </p>
    <ul className='about__list'>Future updates will include:
      <li>Firebase Baas</li>
      <li>User Login/Registration</li>
      <li>filter logic and usability</li>
      <li>favorites page and recipe page</li>
      
    </ul>
    <Link className='__homeLink' to='/'>Back to Recipes</Link></div>
  )
}

export default About