import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

//@TODO restyle content to better match app design
//@TODO add transition and hovers to content items
function Content() {
    const {recipes} = useContext(RecipeContext)


    const handleOpenRecipe = async(id)=>{
        //@TODO STORE API KEY ELSEWHERE
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=033797df84694890b040b816a119b147`)
        const data = await response.json()
    }

    return(
        <div className="home__content">
        {recipes.map(recipe=>{
            return(
                //@TODO add heart icon for favorite with logic to style
                <div key={recipe.id} className="home__content__item">
                    <h3>{recipe.title}</h3>
                    <img onClick={(()=>handleOpenRecipe(recipe.id))} src={recipe.image} alt="" />
                </div>
            )
        })}
        </div>
    )
}

export default Content