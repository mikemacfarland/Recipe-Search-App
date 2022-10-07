import { useContext,useState,useEffect } from "react"
import RecipeContext from "../context/RecipeContext"
import {auth} from '../firebase_config'

function Account() {

    const [changeEmail,setChangeEmail] = useState(false)
    const [changeName,setChangeName] = useState(false)
    const [deleteUser,setDeleteUser] = useState(false)

    //@TODO component is getting manually refreshed by window.
    // add state or mofidy existing state 
    const {
        logOut,
        lostPassword,
        handleUpdate,
        handleDeleteUser
    } = useContext(RecipeContext)
    
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
        (newEmail)
    }

    const handleNameChange = ()=>{
        const newName = document.querySelector('#changeName').value
        handleUpdate(newName)
        window.location.reload(false)
    }

    const handleLogout=()=>{
        logOut()
    }

  return (
        <div className="account">
            <h1>{auth.currentUser ? auth.currentUser.displayName : ''}</h1>
            <h4>email</h4>

            <div>
                <p>{auth.currentUser? auth.currentUser.email : ''}</p>
                {/* <div className="account__link" onClick={handleSetChangeEmail} >Change Email</div>
                {changeEmail ?  <div>
                                    <input id='changeEmail'></input>
                                    <button onClick={handleEmailChange}>Change Email</button>
                                </div> : '' */}
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
                <p>{auth.currentUser? auth.currentUser.metadata.creationTime : ''}</p>
            </div>

            <div>
                <h4>Last Login</h4>
                <p>{auth.currentUser ? auth.currentUser.metadata.lastSignInTime : ''}</p>
            </div>
                <a onClick={handleLogout} href="/">Logout</a>
            {/* <div className="danger">
                <h4>danger zone</h4>
                <div className="account__link" onClick={(()=>setDeleteUser(true))} >delete account</div>
                {deleteUser ?   <div>
                                    <p>Are you sure?</p>
                                    <button onClick={handleDeleteUser}>Yes</button>
                                    <button onClick={(()=>setDeleteUser(false))}>No</button>
                                </div> : ''
                }
            </div> */}

        </div> 
  )
}

export default Account