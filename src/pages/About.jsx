import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='about'>
      <h1>About</h1>
      <h5>The Sauce V.086 - Development Build</h5>
      <p>Developed and Designed by &nbsp;
        <strong>Mike Macfarland</strong>
        <br/>This SPA currently uses the &nbsp;
        <strong>
          <a target='blank'href="https://spoonacular.com/food-api">Spoontacular API</a>
        </strong> to generate content and firebase to host, authenticate, and store users and user data.
      </p>
      <p>To use all features in this app, login with email: <strong>test@test.com</strong> password: <strong>testTest1!</strong><br/>
      or create your own account <a href="/signup">here</a></p>
    <ul className='about__list'>Future updates will include:
      <li>switch to a more reliable API</li>
      <li>domain name change - will use thesaucecooking.com</li>
      <li>favorites page lists</li>
      <li>performance and error/message handling updates</li>
    </ul>
    <Link className='__homeLink' to='/'>Back to Recipes</Link></div>
  )
}

export default About