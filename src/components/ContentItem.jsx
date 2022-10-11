import { useEffect } from "react"
import { useContext,useState} from "react"
import { ReactComponent as Heart} from '../assets/icons/heart.svg'
import RecipeContext from "../context/RecipeContext"

function ContentItem({recipe}) {

    const {
        userFavorites,
        setUserFavorites,
        handleWriteUserData,
        signedIn
    } = useContext(RecipeContext)

    const [liked,setLiked] = useState(false)

    const handleLike =(id)=>{
        const favorites = userFavorites ? userFavorites.filter(item=>item !== id) : []
        if(userFavorites && userFavorites.includes(id)){
            const favorites = userFavorites.filter(item=>item !== id)
            setUserFavorites(favorites)
            setLiked(false)
        }
        else{
            favorites.push(id)
            setUserFavorites(favorites)
            setLiked(true)
        }
    }

    useEffect(()=>{
        userFavorites.includes(recipe.id) ? setLiked(true) : setLiked(false)
    },[])

    const handleOpenRecipe = async(id)=>{
        //@TODO STORE API KEY ELSEWHERE
        // const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=033797df84694890b040b816a119b147`)
        // const data = await response.json()
        console.log('openrecipe')
    }

  return (
    <div  className="home__content__item">
        <div className='home__content__item__banner'>
            <h3>{recipe.title}</h3>
            {signedIn ? 
            <div onClick={(()=>handleLike(recipe.id))}className='like'>
                 <Heart className={`'heart' ${liked ? '--liked' : ''}`}/>
            </div>
            :''}
        </div>
        <img onClick={((e)=>handleOpenRecipe(recipe.id))} src={recipe.image} alt="" />
    </div>
  )
}

export default ContentItem