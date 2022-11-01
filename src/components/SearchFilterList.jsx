import { useState,useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function SearchFilterList({title,filter,type}) {

    const [active,setActive] = useState(false)
    const {urlEndpoints,setUrlEndpoints} = useContext(RecipeContext)
    
    const handleSetUrlEndpoints = (arr)=>{
        //@QUESTION how do i pass type dynamically to set properties of urlEndpoints based on type passed to component?
        setUrlEndpoints({...urlEndpoints,type:arr})
      }

    const checkCheck = (e)=>{
        const labels = document.querySelectorAll('label')
        for(let i = 0; i < labels.length; i++){
            if(labels[i].htmlFor === e.target.id)
            labels[i].classList.toggle('--checked')
        }
        const inputs = e.target.parentNode.parentNode.querySelectorAll('.--checked')
        const inputTypes = []
        inputs.forEach(input=>{
            inputTypes.push(input.innerText)
        })
        handleSetUrlEndpoints(inputTypes)
    }

    window.addEventListener('click',(e)=>{
        const lists = document.querySelectorAll('.--active')
        lists.forEach(list=>{
            if(!list.contains(e.target) && e.target !== list.previousSibling){
                setActive(false)
            }
        })
    })
    
    //@TODO UI if selections are made, indicate in the parent element to user
  return (<div className="search__filters__item">
            <h4 onClick={(()=>setActive(active ? false : true))}>{title}</h4>
            <ul className={`search__filters__item__list ${active ? '--active' : ''}`}>
            {filter.map(filter=>{
                return(
                    <li className='search__filters__item__list__li'  key={filter}>
                        <label htmlFor={filter}>{filter}</label>
                        <input 
                        onChange={(e)=>checkCheck(e)}
                         id={filter} type="checkbox" />
                    </li>
                )
            })}
            </ul>
        </div>
  )
}

export default SearchFilterList