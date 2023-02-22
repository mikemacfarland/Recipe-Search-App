// FIREBASE FUNCTIONS
// FIREBASE AUTH
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // sendPasswordResetEmail,
    // reauthenticateWithCredential,
    updateProfile,
    // signOut,
    // deleteUser,
    // EmailAuthProvider,
    // onAuthStateChanged
} from 'firebase/auth'
import { getUserData } from './database';

// // SIGNUP
export const signUp = (auth,email,password,userName,setCurrentUser,setAlert,setSignedIn,setEmail,setPassword,setUserFavorites)=>{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(auth,email,password,setAlert,setCurrentUser,setSignedIn,setEmail,setPassword,setUserFavorites)
        updateUser(auth,userName)
        setCurrentUser(user)
      })
      // Handle Additional errors
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        errorCode === 'auth/email-already-in-use' ? setAlert({type:'--error',value:'User already exists'}) : setAlert({type:'',value:''})
      });
}

// LOGIN
export const login = async (auth,email,password,setAlert,setCurrentUser,setSignedIn,setEmail,setPassword,setUserFavorites)=>{
    console.log(email,password)
    console.log(auth)
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setSignedIn(true)
            setEmail('')
            setPassword('')
            getUserData(user,setUserFavorites)
            return setCurrentUser(user) 
        })
        // Handle Additional Errors
        .catch((error) => {
            console.log(error)
            const errorCode = error.code;
            errorCode === 'auth/user-not-found' ? setAlert({type:'--error',value:'User not found/invalid Email'}) :
            errorCode === 'auth/internal-error' ? setAlert({type:'--error',value:'Invalid email/password'}) :
            errorCode === 'auth/wrong-password' ? setAlert({type:'--error',value:'Invalid Password'}) : setAlert({type:'',value:''})
        });
}

// // UPDATE USER PROFILE
const updateUser = (auth,name)=>{
    updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            //run code after values have been set
        }).catch((error) => {
            // An error occurred
            console.log(error)
    });
}

// // ON USER AUTH UPDATE/SIGNOUT/SIGNIN
// useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         // const uid = user.uid;
//         setCurrentUser(user)
//         setSignedIn(true)
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
//     });
// })

// // REAUTHENTICATE USER FOR RE-AUTH REQUIRED ACTIONS
// const handleReauthenicate = ()=>{
//     const user = auth.currentUser;
//     // why this isnt documented in firebase docs is a mystery
//     // const credential = signInWithEmailAndPassword(auth, email, password)
//     const credential = EmailAuthProvider.credential(email,password)
//     reauthenticateWithCredential(user,credential).then(() => {
//     // User re-authenticated.
//     }).catch((error) => {
//         const errorCode = error.code
//         errorCode === 'auth/invalid-email' ? showAlert('error','Invalid-Email') :
//         errorCode === 'auth/wrong-password' ? showAlert('error','Wrong Password') :
//         errorCode === 'auth/user-mismatch' ? showAlert('error','Invalid Email') : 
//         errorCode === 'auth/internal-error' ? showAlert('error','Invalid Email or Password') :
//         showAlert('error','Unknown Error')
//     });
// }

// // DELETE USER - REQUIRES REAUTHENTICATION
// const handleDeleteUser = (user)=>{
//     handleReauthenicate()
//     deleteUser(user).then(() => {
//         showAlert('message','User Deleted')
//         // logOut()
//         navigate('/')
//         console.log('userdeleted')
//         ('userDELETE')
//         // User deleted.
//     }).catch((error) => {
//         console.log('userdeleted error')
//         console.log(error)
//         console.log(error.code)
       
//     });
// }

// // LOGOUT
// const logOut = ()=>{
//     signOut(auth).then(() => {
//         setSignedIn(false)
//         setCurrentUser('')
//         setUserFavorites('')
//         setPassword('')
//         setEmail('')
//         navigate('/')
        
//         showAlert('message','User Logged Out')
//     }).catch((error) => {
//     });
// }

// // LOST PW EMAIL REQUEST
// const lostPassword = async ()=>{
//     sendPasswordResetEmail(auth, email)
//     .then(() => {
//         showAlert('message',`email sent to ${email}`)
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         errorCode === 'auth/invalid-email' ? showAlert('error','Invalid email') :
//         errorCode === 'auth/user-not-found' ? showAlert('error','User not found') : 
//         errorCode === 'auth/too-many-requests' ? showAlert('error','Too many requests, Try again later') : setAlert('')
//     });
// }
