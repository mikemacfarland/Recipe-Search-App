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

   export const checkEmail = (email)=>{
        if(email.length > 5 && email.includes('@') && email.includes('.')){
        return true
        }
        else{
        return false
        }    
    }

    export const checkPw = (password)=>{
        if(password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*?]/.test(password) && /[0-9]/.test(password)){
            return true
        }
        else{
            return false
        }
    }
   
