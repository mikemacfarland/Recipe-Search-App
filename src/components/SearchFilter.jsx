import React from 'react'
import { useState } from 'react'
import cuisines from '../assets/cuisines'

function SearchFilter() {

  const [recipeCuisines,setRecipeCuisines] = useState(cuisines)

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('formsubmit')
  }

  return (
    <form onSubmit={handleSubmit} className='search'>
      <input type="text"/>
      {/*  make select into a reusable component since there will be multiple */}
      <select name="" id="">
        {/* by default display random recipes or newest recipes until serach q is completed */}
        <option value="" disabled={true}>--Cuisine--</option>
        {recipeCuisines.map(cuisine=>{
          return (
            <option key={cuisine}>{cuisine}</option>
          )
        })}
      </select>
      <button type='submit'></button>
    </form>
  )
}

export default SearchFilter