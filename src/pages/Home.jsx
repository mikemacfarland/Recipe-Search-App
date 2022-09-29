import SearchFilter from '../components/SearchFilter'
import RecipeContext from '../context/RecipeContext'
import {useContext} from 'react'
import Content from '../components/Content'

function Home() {

  const {recipes} = useContext(RecipeContext)
  console.log(recipes)

  return (
    <div className="home">
        <SearchFilter/>
        <Content/>
    </div>
  )
}

export default Home

