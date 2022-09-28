import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {RecipeProvider} from "./context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <div className="app">
        <Router>
          <Nav/>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/about' element={<About/>} />
          </Routes>
        </Router>
        <Footer/>
      </div>
    </RecipeProvider>
  )
}

export default App;
