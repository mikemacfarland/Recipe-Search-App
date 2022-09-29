
function SearchFilterList({title,filter}) {

    const checkCheck = (e)=>{
        const labels = document.querySelectorAll('label')
        let forLabel = ''
        for(let i = 0; i < labels.length; i++){
            if(labels[i].htmlFor === e.target.id)
            labels[i].classList.toggle('--checked')
        }
        console.log(forLabel)
        console.log(e.target.id)
    }

    const openList = (e)=>{
        const filterLists = document.querySelectorAll('.search__filters__item__list')
        for(let i = 0; i < filterLists.length; i++){
            if(!e.target.nextSibling.classList.contains('--active') && filterLists[i].previousSibling === e.target){
                filterLists[i].classList.add('--active')
                console.log(filterLists[i])
            }
            else{
                filterLists[i].classList.remove('--active')
            }
        }
    }

  return (<div className="search__filters__item">
            <h4 onClick={(e)=>openList(e)}>{title}</h4>
            <ul className="search__filters__item__list">
            {filter.map(filter=>{
                return(
                    <li className='search__filters__item__list__li'  key={filter}>
                        <label htmlFor={filter}>{filter}</label>
                        <input onChange={(e)=>checkCheck(e)} id={filter} type="checkbox" />
                    </li>
                )
            })}
            </ul>
        </div>
  )
}

export default SearchFilterList