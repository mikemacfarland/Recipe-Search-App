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
    <div className='search'>
      <h4>Filters</h4>
      <form onSubmit={handleSubmit} className='search__form'>
        <div className='search__input'>
          <input type="text" placeholder='Keyword'/>
          <button type='submit'><img src={Icons.searchIcon} alt="search" /></button>
        </div>

        <div className='search__filters'>
          <SearchFilterList title='Recipe Type' filter={filters.recipeType}/>
          <SearchFilterList title='Diet' filter={filters.diets}/>
          <SearchFilterList title='Cuisine' filter={filters.cuisines}/>
          <SearchFilterList title='Intolorances' filter={filters.intolorances}/>
        </div>
      </form>
    </div>
  )
}

export default SearchFilter