
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

  return (<div className="search__filters__item">
            <h4>{title}</h4>
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