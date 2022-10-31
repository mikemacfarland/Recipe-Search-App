import { useContext,useState} from "react"
import RecipeContext from "../context/RecipeContext"
import {auth} from '../firebase_config'

function Account() {
    // const [changeEmail,setChangeEmail] = useState(false)
    const [changeName,setChangeName] = useState(false)
    const [deleteUser,setDeleteUser] = useState(false)
    const {
        logOut,
        lostPassword,
        handleUpdate,
        handleDeleteUser,
        setEmail,
        setPassword,
        setAlert,
    } = useContext(RecipeContext)

    
    //@TODO can handle these actions without state?
    // const handleSetChangeEmail = ()=>{
    //     setChangeName(false)
    //     !changeEmail ? setChangeEmail(true) : setChangeEmail(false)
    // }

    //@TODO can handle these actions without state?
    const handleSetChangeName = ()=>{
        // setChangeEmail(false)
        !changeName ? setChangeName(true) : setChangeName(false)
        
    }

    // const handleEmailChange = ()=>{
    //     const newEmail = document.querySelector('#changeEmail').value
    //     (newEmail)
    // }

    const handleNameChange = ()=>{
        const newName = document.querySelector('#changeName').value
        handleUpdate(newName)
        window.location.reload(false)
        setAlert('Name Changed')
    }

    const handleLogout=()=>{
        logOut()
    }

    //@TODO these are repeated in login page, make them global?
    const handleSetEmail =(e)=>{
        setEmail(e.target.value)
      }
    
    const handleSetPassword = (e)=>{
        setPassword(e.target.value)
      }

    const handleHandleDeleteUser=(e)=>{
        e.preventDefault()
        handleDeleteUser(auth.currentUser)
    }

  return (
    
        <div className="account">
            <h1>{auth.currentUser ? auth.currentUser.displayName : ''}</h1>
            

            <div className="account__item">
                <h4>email</h4>
                <p>{auth.currentUser? auth.currentUser.email : ''}</p>
                {/* <div className="account__link" onClick={handleSetChangeEmail} >Change Email</div>
                {changeEmail ?  <div>
                                    <input id='changeEmail'></input>
                                    <button onClick={handleEmailChange}>Change Email</button>
                                </div> : '' */}
            </div>

            <div className="account__item">
            <div className="account__link" onClick={handleSetChangeName} >Change Username</div>
                {changeName ?   <div>
                                    <input id='changeName'></input>
                                    <button onClick={handleNameChange}>Change User Name</button>
                                </div> : ''
                }
            </div>

            <div className="account__link" onClick={lostPassword}>Request Change Password</div>
            <div className="account__item">
                <h4>Member since</h4> 
                <p>{auth.currentUser? auth.currentUser.metadata.creationTime : ''}</p>
            </div>

            <div className="account__item">
                <h4>Last Login</h4>
                <p>{auth.currentUser ? auth.currentUser.metadata.lastSignInTime : ''}</p>
            </div>

            <div className="account__item">
                <a onClick={handleLogout} href="/">Logout</a>
            </div>
                
            
            <div className="danger">
                <div className="danger__banner">
                    <h4>Danger zone</h4>
                    <div className="account__link" onClick={(()=>setDeleteUser(true))} >delete account</div>
                </div>
                {deleteUser ?   <form onSubmit={handleHandleDeleteUser} className="danger__confirmation">
                                    <legend>Are you sure?</legend>
                                    <fieldset className="danger__auth">
                                        <label htmlFor="email">Email</label>
                                        <input onBlur={handleSetEmail} type="text" />
                                        <label htmlFor="password">Password</label>
                                        <input onBlur={handleSetPassword}type="text" />
                                    
                                    <div className="danger__buttons">
                                        {/* should button be a submit button? probs */}
                                        <button>Yes</button>
                                        <button onClick={(()=>setDeleteUser(false))}>No</button>
                                    </div>
                                    </fieldset>
                                </form> : ''
                }

            </div>

        </div> 
  )
}

export default Account