import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Recipe() {

  const {
    currentRecipe
  } = useContext(RecipeContext)


  return (
    <div className='recipe__content'>
      <div className='recipe__banner'>
        <h2>{currentRecipe.title}</h2>
        <img src={currentRecipe.image} alt="" />
      </div>
      
      {currentRecipe.diets.length > 0 ? <div>
        <h4>Diets</h4>
        <ul>
          {currentRecipe.occasions}
        </ul>
      </div>
      : null}

      {currentRecipe.occasions.length > 0 ? <div>
        <h4>Occasions</h4>
        <ul>
          {currentRecipe.occasions}
        </ul>
      </div>
      : null}

      <div>
        <p>{currentRecipe.summary}</p>
      </div>
      <div>
        <h4>ingredients</h4>
        <ul>
          {currentRecipe.extendedIngredients.map(ingredient=>{
            return(
              <li key={ingredient.id}>{ingredient.original}</li>
            )
          })}
        </ul>
      </div>
      <div>
        <h4>cooking instructions</h4>
        <ol>
          {currentRecipe.analyzedInstructions[0].steps.map(step=>{
            return(
              <li>{step.step}</li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default Recipe