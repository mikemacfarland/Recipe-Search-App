// UTILITY FUNCTIONS

// HELPER FUNCTIONS    
    // Function to show UI alerts
   export const showAlert = (setState)=>{
    setState(true)
    clearTimeout()
    setTimeout(()=>{
        setState(false)
    },3000)
   }

    // Random number under 900
   export const randomNum = ()=>{
    return Math.floor(Math.random()*900)
   }

   
   
