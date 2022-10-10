import React from 'react'
import {useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'
import SearchFilterList from './SearchFilterList'

function SearchFilter() {

  const {
        handleGetRecipes,
        setRecipeType,
        setDiet,
        setCuisine,
        setIntolorances,
        setSearchTerm,
  } = useContext(RecipeContext)
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    handleGetRecipes()
  }

  const handleSetSearchTerm = ()=>{
    const userSearchTerm = document.querySelector('#searchTerm').value
    setSearchTerm(userSearchTerm)
  }

  return (
    <div className='search'>
      <form onSubmit={handleSubmit} className='search__form'>
          <input onBlur={handleSetSearchTerm} id="searchTerm" className='search__input' type="text" placeholder='Search Keyword'/>
          <button type='submit'>Search<img src={Icons.searchIcon} alt="search" /></button>
        <div className='search__filters'>
          <SearchFilterList setType={setRecipeType} title='Recipe Type' filter={filters.recipeType}/>
          <SearchFilterList setType={setDiet} title='Diet' filter={filters.diets}/>
          <SearchFilterList setType={setCuisine} title='Cuisine' filter={filters.cuisines}/>
          <SearchFilterList setType={setIntolorances} title='Intolorances' filter={filters.intolorances}/>
        </div>
      </form>
    </div>
  )
}

export default SearchFilter