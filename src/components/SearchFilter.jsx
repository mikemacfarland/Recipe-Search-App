import React from 'react'
// import { useState } from 'react'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'
import SearchFilterList from './SearchFilterList'

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
          <SearchFilterList filter={filters.recipeType}/>
          <SearchFilterList filter={filters.diets}/>
          <SearchFilterList filter={filters.cuisines}/>
          <SearchFilterList filter={filters.intolorances}/>
        </div>
          
        
      </form>
    </div>
  )
}

export default SearchFilter