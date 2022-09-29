import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div><h1>About</h1>
    <p>Developed and Designed by <strong>Mike Macfarland</strong><br/>
    This SPA currently uses the <strong><a href="https://spoonacular.com/food-api">Spoontacular API</a></strong> to generate content.</p>

    <ul className='about__list'>Future updates will include:
      <li>Firebase backend</li>
      <li>User Login/Registration</li>
      <li></li>
      <li></li>
      
    </ul>
    <Link className='__homeLink' to='/'>Back to Recipes</Link></div>
  )
}

export default About