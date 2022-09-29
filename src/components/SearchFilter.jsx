import React from 'react'
// import { useState } from 'react'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'

function SearchFilter() {

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('formsubmit')
  }

  return (
    <div>
      <h4>Filters</h4>
      <form onSubmit={handleSubmit} className='search active'>
        <div className='search__input'>
          <input type="text" placeholder='Keyword'/>
          <button type='submit'><img src={Icons.searchIcon} alt="search" /></button>
        </div>

        <div>


          {/* make these into components pass props to generate content*/}
          {filters.map(filter=>{
            
          })}

          <div>Recipe Type
          <ul>
            {filters.recipeType.map(type=>{
              return(
              <li key={type}>
                <label htmlFor={type}>{type}</label>
                <input id={type} type="checkbox" />
              </li>
              )
            })}
          </ul>
          </div>
        </div>
          <div>Cuisines
            <ul className=''>
              {filters.cuisines.map(cuisine=>{
                return (
                  <li key={cuisine}>
                    <label htmlFor={cuisine}>{cuisine}</label>
                    <input id={cuisine} type="checkbox" />
                    </li>
                )
              })}
            </ul>
          </div>
          <div>Diets
          <ul>
            {filters.diets.map(diet=>{
              return(
              <li key={diet}>
                <label htmlFor={diet}>{diet}</label>
                <input id={diet} type="checkbox" />
              </li>
              )
            })}
          </ul>
          </div>
          <div>Intolorances
          <ul>
            {filters.intolorances.map(intolorance=>{
              return(
              <li key={intolorance}>
                <label htmlFor={intolorance}>{intolorance}</label>
                <input id={intolorance} type="checkbox" />
              </li>
              )
            })}
          </ul>
          </div>
        </div>

      </form>
    </div>
  )
}

export default SearchFilter