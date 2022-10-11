import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Favorites() {

  const {writeUserData,getUserData,currentUser} = useContext(RecipeContext)

 
  const randomNumber=()=>{
    return Math.floor(Math.random()*100000)
  }
 
  const favorites = []
  for(let i = 0;i<4;i++){
    favorites.push(randomNumber())
  }
  
  

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

    </div>
  )
}

export default Favorites