import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import ContentItem from "./ContentItem"

function Content() {
    
    const {
        recipes,
        urlEndpoints,
        setUrlEndpoints,
        noOfResults,
    } = useContext(RecipeContext)

    const handleOffset = (e)=>{
        const currentOffset = urlEndpoints.offset
        e.target.innerText === 'Previous' && currentOffset >= noOfResults ? setUrlEndpoints({...urlEndpoints,offset:(currentOffset - noOfResults)}) :
        e.target.innerText === 'Next' ? setUrlEndpoints({...urlEndpoints,offset:(currentOffset + noOfResults)}) : 
        urlEndpoints.offset === 0 ? setUrlEndpoints({...urlEndpoints,offset:0}) : setUrlEndpoints({...urlEndpoints,offset:0})
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

                <div className="page__offset">
                    <p>{urlEndpoints.offset} - {urlEndpoints.offset + noOfResults}</p>
                </div>

                <div className="page__next">
                    <p onClick={((e)=>handleOffset(e))}>Next</p>
                </div>
            </div>
        </div>  
    )
}

export default Content