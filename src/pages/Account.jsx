import { useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function Account() {

    const {currentUser,logOut} = useContext(RecipeContext)
    console.log(currentUser)

    const handleLogout=()=>{
        logOut()
    }

  return (
        <div className="account">
            <h1>{currentUser.displayName}</h1>
            <h4>email</h4>
            <p>{currentUser.email}</p>
            <a href="change email">Change Email</a>
            <a href="change username">Change Username</a>
            <a href="change password">Change Password</a>
            <h4>Member since</h4> 
            <p>{currentUser.metadata.creationTime}</p>
            <h4>Last Login</h4>
            <p>{currentUser.metadata.lastSignInTime}</p>
            <a onClick={handleLogout} href="/">Logout</a>
            <h4>danger zone</h4>
            <a href="delete account">delete account</a>

        </div> 
  )
}

export default Account