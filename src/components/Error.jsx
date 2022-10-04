import { useContext,useEffect } from "react"
import RecipeContext from "../context/RecipeContext"

function Error() {

    const {error} = useContext(RecipeContext)

    
  return (
    <div className="error">{error}</div>
  )
}

export default Error