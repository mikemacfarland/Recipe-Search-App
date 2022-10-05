import Home from "./pages/Home";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {RecipeProvider} from "./context/RecipeContext";

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="app">
            <Nav/>
            <Alert/>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About/>}/>
              <Route exact path='/account' element={<Account/>} />
              <Route exact path='/favorites' element={<Favorites/>} />
              <Route exact path='/profile' element={<Profile/>}/>
              <Route exact path='/signup' element={<Signup/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
            </Routes>
            <Footer/>
        </div>
      </RecipeProvider>
    </Router>
  )
}

export default App;
