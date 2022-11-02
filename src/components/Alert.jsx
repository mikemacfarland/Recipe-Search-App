import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Alert() {

  const {alert} = useContext(RecipeContext)
  
  return (
    <div className="alert">{alert}</div>
  )
}

export default Alert