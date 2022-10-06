import React from 'react'
import { useState,useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'
import SearchFilterList from './SearchFilterList'

function SearchFilter() {

  const {getRecipes} = useContext(RecipeContext)
  const handleSubmit = (e)=>{
    e.preventDefault()
    // getRecipes(searchUrl)
    console.log('formsubmit')
  }

  const [searchTerm,setSearchTerm] = useState('')
  const [recipeType,setRecipeType] = useState('')
  const [diet,setDiet] = useState('')
  const [cuisine,setCuisine] = useState('')
  const [intolorances,setIntolorances] = useState('')
  // const [searchUrl,setSearchUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)

  // console.log(searchUrl)

  return (
    <div className='search'>
      <form onSubmit={handleSubmit} className='search__form'>
          <input className='search__input' type="text" placeholder='Search Keyword'/>
          <button type='submit'>Search<img src={Icons.searchIcon} alt="search" /></button>
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