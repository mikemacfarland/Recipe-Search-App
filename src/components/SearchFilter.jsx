import React from 'react'
import {useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'
import SearchFilterList from './SearchFilterList'

function SearchFilter() {

  const {
      setUrlEndpoints
  } = useContext(RecipeContext)
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setUrlEndpoints.offset(0)
  }

  const handleSetSearchTerm = ()=>{
    const userSearchTerm = document.querySelector('#searchTerm').value
    setUrlEndpoints.searchTerm(userSearchTerm)
  }

  return (
    <div className='search'>
      <form onSubmit={handleSubmit} className='search__form'>
          <input onBlur={handleSetSearchTerm} id="searchTerm" className='search__input' type="text" placeholder='Search Keyword'/>
          <button type='submit'>Search<img src={Icons.searchIcon} alt="search" /></button>
        <div className='search__filters'>
          <SearchFilterList setType={setUrlEndpoints} title='Recipe Type' filter={filters.recipeType}/>
          <SearchFilterList setType={setUrlEndpoints} title='Diet' filter={filters.diets}/>
          <SearchFilterList setType={setUrlEndpoints} title='Cuisine' filter={filters.cuisines}/>
          <SearchFilterList setType={setUrlEndpoints} title='Intolorances' filter={filters.intolorances}/>
        </div>
      </form>
    </div>
  )
}

export default SearchFilter