import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import ContentItem from '../components/ContentItem'

function Favorites() {

  const {writeUserData,getUserData,currentUser,userFavorites} = useContext(RecipeContext)

  console.log(userFavorites.length)

  return (
    <div>
        {userFavorites.length === 0 ? 
          <div className="home__content">
              <h3>No favorites here, like recipes to show them here</h3>
              {/* @TODO put clever image here */}
          </div> :
          <div className='home__content'>
          {userFavorites.map(recipe=>{
          return(<ContentItem key={recipe.id} recipe={recipe}/>)
          })}
          </div>
        }
      
    </div>
  )
}

export default Favorites