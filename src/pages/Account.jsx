import { useContext,useState } from "react"
import RecipeContext from "../context/RecipeContext"

function Account() {

    const [changeEmail,setChangeEmail] = useState(false)
    const [changeName,setChangeName] = useState(false)
    const {currentUser,logOut,setUserName,lostPassword} = useContext(RecipeContext)
    console.log(currentUser)


    
    //@TODO can handle these actions without state
    const handleSetChangeEmail = ()=>{
        setChangeName(false)
        !changeEmail ? setChangeEmail(true) : setChangeEmail(false)
    }

    //@TODO can handle these actions without state
    const handleSetChangeName = ()=>{
            setChangeEmail(false)
            !changeName ? setChangeName(true) : setChangeName(false)
        }

    const handleEmailChange = ()=>{
        const newEmail = document.querySelector('#changeEmail').value
        console.log(newEmail)
    }

    const handleNameChange = ()=>{
        const newName = document.querySelector('#changeName').value
        console.log(newName)
    }

    const handleLogout=()=>{
        logOut()
    }

  return (
        <div className="account">
            <h1>{currentUser.displayName}</h1>
            <h4>email</h4>
            <p>{currentUser.email}</p>
            <div className="account__link" onClick={handleSetChangeEmail} >Change Email</div>
            {changeEmail ?  <div>
                                <input id='changeEmail'></input>
                                <button onClick={handleEmailChange}>Change Email</button>
                            </div> : ''
            }
            <div className="account__link" onClick={handleSetChangeName} >Change Username</div>
            {changeName ?   <div>
                                <input id='changeName'></input>
                                <button onClick={handleNameChange}>Change User Name</button>
                            </div> : ''
            }
            <div className="account__link" onClick={lostPassword}>Request Change Password</div>
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