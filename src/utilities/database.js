
import {
    getDatabase,
    ref,
    set,
    onValue
} from "firebase/database"

// GET USER DATA (FAVORITES)
export const getUserData = (currentUser,setState)=>{
    console.log('get user data')
    const db = getDatabase();
    const favoritesRef = ref(db, 'users/' + currentUser.uid);
    onValue(favoritesRef, (snapshot) => {
    const data = snapshot.val();
    data ? setState(data.favorites) : setState(null)
    })
}

// WRITE USER DATA (FAVORITES)
export const writeUserData = (currentUser,signedIn,userFavorites)=>{
    const db = getDatabase();
    if (currentUser && signedIn && userFavorites !== null){
        set(ref(db, 'users/' + currentUser.uid), {
            favorites: userFavorites
        })
    }
}