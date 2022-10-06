import { useContext,useState } from "react"
import RecipeContext from "../context/RecipeContext"

function Account() {

    const [changeEmail,setChangeEmail] = useState(false)
    const [changeName,setChangeName] = useState(false)
    const [deleteUser,setDeleteUser] = useState(false)
    const {currentUser,logOut,setUserName,lostPassword,handleUpdate} = useContext(RecipeContext)
    
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
        setUserName(newName)
        handleUpdate()
    }

    const handleLogout=()=>{
        logOut()
    }

    const handleDeleteUser = ()=>{
        console.log('delete user')
    }

    //@TODO change email, change username, delete account process
    console.log(currentUser.displayName)
  return (
        <div className="account">
            <h1>{currentUser.displayName}</h1>
            <h4>email</h4>

            <div>
                <p>{currentUser.email}</p>
                <div className="account__link" onClick={handleSetChangeEmail} >Change Email</div>
                {changeEmail ?  <div>
                                    <input id='changeEmail'></input>
                                    <button onClick={handleEmailChange}>Change Email</button>
                                </div> : ''
                }
            </div>

            <div>
            <div className="account__link" onClick={handleSetChangeName} >Change Username</div>
                {changeName ?   <div>
                                    <input id='changeName'></input>
                                    <button onClick={handleNameChange}>Change User Name</button>
                                </div> : ''
                }
            </div>

            <div className="account__link" onClick={lostPassword}>Request Change Password</div>
            <div>
                <h4>Member since</h4> 
                <p>{currentUser.metadata.creationTime}</p>
            </div>

            <div>
                <h4>Last Login</h4>
                <p>{currentUser.metadata.lastSignInTime}</p>
            </div>

            <div>
                <a onClick={handleLogout} href="/">Logout</a>
                <h4>danger zone</h4>
                <div className="account__link" onClick={(()=>setDeleteUser(true))} >delete account</div>
                {deleteUser ?   <div>
                                    <p>Are you sure?</p>
                                    <button onClick={handleDeleteUser}>Yes</button>
                                    <button onClick={(()=>setDeleteUser(false))}>No</button>
                                </div> : ''
                }
            </div>

        </div> 
  )
}

export default Account