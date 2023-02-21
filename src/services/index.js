// SERVICE FUNCTIONS

// FETCH DATA
// Args to pass getdata: State setter function(which state to set), url PathName & Url endpoints if applicable
export const getData = async (setState,pathName,endpoints)=>{
    
    // URL Constructor for fetch
    const url = new URL('https://api.spoonacular.com')
    url.pathname = pathName
    url.searchParams.append('apiKey',process.env.REACT_APP_API_KEY)   

    // if endpoints are passed into function append endpoints unto URL
    if(endpoints){
        const urlQueries = [
            {name:'query',value:endpoints.searchTerm},
            {name:'number',value:endpoints.noOfResults},
            {name:'offset',value:endpoints.offset},
            {name:'cuisine',value:endpoints.cuisine},
            {name:'diet',value:endpoints.diet},
            {name:'intolerances',value:endpoints.intolorances},
            {name:'type',value:endpoints.recipeType},
        ]
        urlQueries.forEach((query)=>url.searchParams.append(query.name,query.value))
    }

    // Fetch data from url
    await fetch(url)
    .then( res => {
        if(res.ok){
            return res.json()
        }
        return Promise.reject(res)
    })
    .then(data =>{
        if(data.results){
            console.log('data.results:',data.results)
            return setState(data.results)
        }
        else{
            console.log('data:',data)
            return setState(data)
        }
    })
    .catch(err => console.log(err))
}