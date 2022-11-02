import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import ContentItem from '../components/ContentItem'

function Favorites() {

  const {userFavorites} = useContext(RecipeContext)

  return (
    <div>
      {userFavorites === null || userFavorites.length === 0 ?
        <div className="home__content">
          <h3>No favorites here, like recipes to show them here</h3>
        </div> :
        <div className='home__content'>
          {userFavorites.map(recipe=>{
            return(
              <ContentItem key={recipe.id} recipe={recipe}/>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Favorites