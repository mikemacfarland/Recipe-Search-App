import React from 'react'
import { useState,useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import filters from '../assets/filters'
import Icons from '../assets/icons/icons'
import SearchFilterList from './SearchFilterList'
import { useEffect } from 'react'

function SearchFilter() {

  const {getRecipes} = useContext(RecipeContext)
  const handleSubmit = (e)=>{
    e.preventDefault()
    getRecipes(searchUrl)
    console.log('formsubmit')
  }

  const [searchTerm,setSearchTerm] = useState('')
  const [recipeType,setRecipeType] = useState('')
  const [diet,setDiet] = useState('')
  const [cuisine,setCuisine] = useState('')
  const [intolorances,setIntolorances] = useState('')
  const [searchUrl,setSearchUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)

  const handleSetSearchTerm = ()=>{
    const userSearchTerm = document.querySelector('#searchTerm').value
    setSearchTerm(userSearchTerm)
  }

  useEffect(()=>{
    return handleSetSearchUrl()
  },[handleSetSearchTerm,setCuisine,setDiet,setIntolorances,setRecipeType])

  const handleSetSearchUrl = ()=>{
    setSearchUrl(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=3&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)
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