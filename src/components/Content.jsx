import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"
import {ReactComponent as Heart} from '../assets/icons/heart.svg'

function Content() {
    
    const {recipes,
        offset,
        setOffset,
    } = useContext(RecipeContext)

    //unused for now
    const handleOpenRecipe = async(id)=>{
        //@TODO STORE API KEY ELSEWHERE
        // const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=033797df84694890b040b816a119b147`)
        // const data = await response.json()
        console.log('openrecipe')
    }

    const handleOffset = (e)=>{
        const currentOffset = offset
        e.target.innerText === 'Previous' && currentOffset >= 16 ? setOffset(currentOffset - 16) :
        e.target.innerText === 'Next' ? setOffset(currentOffset + 16) : 
        offset === 0 ? setOffset(0) : setOffset(0)
        window.scrollTo(0,0)
    }

    const handleLike =(id)=>{
        //push id to user data
        console.log(id)
    }

    return(
        <div className="home__content">
        {recipes.map(recipe=>{
            return(
                //@TODO add heart icon for favorite with logic to style
                <div key={recipe.id} className="home__content__item">
                    <div className='home__content__item__banner'>
                        <h3>{recipe.title}</h3>
                        <div onClick={(()=>handleLike(recipe.id))}className='like'>
                            {/* //@TODO move this into a component, use state to handle DOM change */}
                            <Heart className="heart"/>
                        </div>
                    </div>
                    <img onClick={((e)=>handleOpenRecipe(recipe.id))} src={recipe.image} alt="" />
                </div>
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