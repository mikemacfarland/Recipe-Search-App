import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import ContentItem from "./ContentItem"

function Content() {
    
    const {recipes,urlEndpoints,setUrlEndpoints,} = useContext(RecipeContext)

    const handleOffset = (location)=>{
        const currentOffset = urlEndpoints.offset
        if(location === 'previous' && currentOffset >= urlEndpoints.noOfResults)
            setUrlEndpoints({...urlEndpoints,offset:(currentOffset - urlEndpoints.noOfResults)})
        if(location === 'next')
            setUrlEndpoints({...urlEndpoints,offset:(currentOffset + urlEndpoints.noOfResults)})
        if(urlEndpoints.offset === 0 && location === 'previous')
            setUrlEndpoints({...urlEndpoints,offset:0})
    }
    
    return(
        recipes.length === 0 ? 
            <div className="home__content">
                <h3>No recipes here, check your filter or search term</h3>
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
                    <p onClick={()=>handleOffset('previous')}>Previous</p>
                </div>

                <div className="page__offset">
                    <p>{urlEndpoints.offset} - {urlEndpoints.offset + urlEndpoints.noOfResults}</p>
                </div>

                <div className="page__next">
                    <p onClick={()=>handleOffset('next')}>Next</p>
                </div>
            </div>
        </div>  
    )
}

export default Content