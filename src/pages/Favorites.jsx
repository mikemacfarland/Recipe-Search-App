import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Favorites() {

  const {writeUserData,getUserData,currentUser,userFavorites} = useContext(RecipeContext)

 
  const getFaves=()=>{
    getUserData(currentUser)
  }

  const setFaves=()=>{
    console.log('set favorites')
  }



  return (
    //add collection organization
    //use home page filters and layout
    <div>Favorites
      <h4>favorites by id</h4>
      <ul>
        {userFavorites? userFavorites.map(fave=>{
          return(<p key={fave}>{fave}</p>)
          }) : <p>no favorites</p>
        }
      </ul>
    </div>
  )
}

export default Favorites