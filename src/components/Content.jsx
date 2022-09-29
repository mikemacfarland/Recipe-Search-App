import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"



function Content() {
    const {recipes} = useContext(RecipeContext)
    console.log(recipes)

    return(
        <div className="home__content">
        {recipes.map(recipe=>{
            return(
                <div key={recipe.id} className="home__content__item">
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt="" />
                    <div>
                        <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
                    </div>
                    <p>{recipe.summary}</p>
                </div>
            )
        })}
        </div>
    )
}

export default Content