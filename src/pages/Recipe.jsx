import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Recipe() {

  const {
    currentRecipe
  } = useContext(RecipeContext)


  return (
    <div className='recipe'>
      <div className='recipe__banner'>
        <h1>{currentRecipe.title}</h1>
        <img src={currentRecipe.image} alt="" />
      </div>
      
      {currentRecipe.diets.length > 0 ? <div className="recipe__info diets">
        <h4>Diets</h4>
        <ul>
          {currentRecipe.diets.map(diet=>{return(<li key={diet}>{diet}</li>)})}
        </ul>
      </div>
      : null}

      {currentRecipe.occasions.length > 0 ? <div className="recipe__info occasions">
        <h4>Occasions</h4>
        <ul>
          {currentRecipe.occasions.map(occasion=>{return(<div key={occasion}>{occasion}</div>)})}
        </ul>
      </div>
      : null}

      <div className="recipe__info summary">
        <h4>Summary</h4>
        <p>No summary due to the recipe api summary data supplying dangerous links/html instead of a string. will either switch api, or combine DOMPurify and regex to sanitize the summary data</p>
      </div>
      
      <div className="recipe__info ingredients">
        <h4>ingredients</h4>
        <ul>
          {currentRecipe.extendedIngredients.map(ingredient=>{
            return(
              <li key={ingredient.id}>{ingredient.original}</li>
            )
          })}
        </ul>
      </div>

      <div className="recipe__info instructions">
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