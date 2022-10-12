import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import ContentItem from "./ContentItem"

function Content() {
    
    const {
        recipes,
        offset,
        setOffset,
        handleSetUrl,
        noOfResults,
    } = useContext(RecipeContext)

    const handleOffset = (e)=>{
        const currentOffset = offset
        e.target.innerText === 'Previous' && currentOffset >= noOfResults ? setOffset(currentOffset - noOfResults) :
        e.target.innerText === 'Next' ? setOffset(currentOffset + noOfResults) : 
        offset === 0 ? setOffset(0) : setOffset(0)
        // window.scrollTo(0,0)
    }
    
    return(
        recipes.length === 0 ? 
            <div className="home__content">
                <h3>No recipes here, check your filter or search term</h3>
                {/* @TODO put clever image here */}
            </div>
        :
        <div className="home__content">
            {recipes.map(recipe=>{
                return(
                    <ContentItem key={recipe.id} recipe={recipe}/>
                )
            })}
            <div className="home__content__navigator">
                <div className="page__prev">
                    <p onClick={((e)=>handleOffset(e))}>Previous</p>
                </div>
                <div className="page__next">
                    <p onClick={((e)=>handleOffset(e))}>Next</p>
                </div>
            </div>
        </div>  
    )
}

export default Content