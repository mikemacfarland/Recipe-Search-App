import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Recipe() {

  const {
    currentRecipe
  } = useContext(RecipeContext)

  // @TODO this should be handled with local state instead of vanilla JS
  const crossOut=(e)=> e.target.classList.toggle('--lineThrough')

  return (
    <>{ currentRecipe ?
    <div className='recipe'>
      <div className='recipe__banner'>
        <h1>{currentRecipe.title}</h1>
        <img src={currentRecipe.image} alt="" />
      </div>
      
      {currentRecipe.diets.length > 0 ? 
        <div className="recipe__info diets">
          <h4>Diets</h4>
          <ul>
            {currentRecipe.diets.map(diet=>{return(<li key={diet}>{diet}</li>)})}
          </ul>
        </div>
      : null}

      {currentRecipe.occasions.length > 0 ? 
        <div className="recipe__info occasions">
          <h4>Occasions</h4>
          <ul>
            {currentRecipe.occasions.map(occasion=>{return(<div key={occasion}>{occasion}</div>)})}
          </ul>
        </div>
      : null}

      <div className="recipe__info summary">
        <h4>Summary</h4>
        <p>Summary purification will be added in next update.</p>
      </div>
      
      <div className="recipe__info ingredients">
        <h4>ingredients</h4>
        <ul>
          {currentRecipe.extendedIngredients.map(ingredient=>{
            return(
              // @TODO prob use uuid here for key
              <li onClick={crossOut} key={ingredient.id + ingredient.original}>{ingredient.original}</li>
            )
          })}
        </ul>
      </div>

      <div className="recipe__info instructions">
        {currentRecipe.analyzedInstructions[0].steps.length > 0 ? <h4>cooking instructions</h4> : <h4>No cooking Instructions Avaliable</h4>}
        <ol>
          {currentRecipe.analyzedInstructions[0].steps.map(step=>{
            return(
              <li key={step.step} onClick={crossOut} >{step.step}</li>
            )
          })}
        </ol> 
      </div> 
    </div>
    : <div>No Current Recipe Selected</div>}
    </>
  )
}

export default Recipe