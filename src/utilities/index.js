//  UTILITY FUNCTIONS

// FETCH DATA
// Args to pass getdata: URL,State setter function(which state to set), whether to return data or data.results
// @TODO - could add url constructor to this function or create a url constructor function to pair with this function.
export const getData = async (url,setState)=>{
    await fetch(url)
    .then( res => {
        // if response is okay -> return response.data from response.json()
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