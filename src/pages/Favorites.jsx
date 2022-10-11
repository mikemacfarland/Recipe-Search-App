import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Favorites() {

  const {writeUserData,currentUser} = useContext(RecipeContext)

  const favorites = ['12453','241365']

  const getFaves=()=>{
    console.log('getfaves')
  }

  const setFaves=()=>{
    console.log(favorites)
    writeUserData(currentUser.uid,favorites)
    console.log('setfaves')
    
  }



  return (
    //add collection organization
    //use home page filters and layout
    <div>Favorites

      <button onClick={getFaves}>getfaves</button>
      <button onClick={setFaves}>setfaves</button>
    </div>
  )
}

export default Favorites