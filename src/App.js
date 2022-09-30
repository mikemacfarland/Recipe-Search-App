import Home from "./pages/Home";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {RecipeProvider} from "./context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app">
            <Nav/>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About/>}/>
              <Route exact path='/favorites' element={<Favorites/>} />
              <Route exact path='/login' element={<Login/>}/>
              
            </Routes>
            <Footer/>
        </div>
      </Router>
    </RecipeProvider>
  )
}

export default App;
