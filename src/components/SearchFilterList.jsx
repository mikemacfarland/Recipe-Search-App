import { useState } from "react"

function SearchFilterList({title,filter,setType}) {

    const [active,setActive] = useState(false)

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
        setType(inputTypes)
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