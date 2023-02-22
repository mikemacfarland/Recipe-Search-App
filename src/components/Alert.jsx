import { useContext,useState, useEffect} from "react"
import RecipeContext from "../context/RecipeContext"
import { showAlert } from "../utilities/helpers"

function Alert() {

  const {alert} = useContext(RecipeContext)
  const [show,setShow] = useState(false)

  useEffect(()=>{
    console.log('alert')
    showAlert(setShow)
  },[alert])

  return (
    <div className={`alert ${show ? alert.type : ''}`}>{alert.value}</div>
  )
}

export default Alert