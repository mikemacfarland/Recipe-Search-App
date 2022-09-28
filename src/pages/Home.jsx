import SearchFilter from '../components/SearchFilter'
import RecipeContext from '../context/RecipeContext'
import {useContext} from 'react'

function Home() {

  const {randomRecipes} = useContext(RecipeContext)
  

  return (
    <div className="content">
        <SearchFilter/>
        <div className="content">
        content
        </div>
    </div>
  )
}

export default Home

