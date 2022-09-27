import Home from "./pages/Home";
import About from "./pages/About";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="app">container
      <nav className="nav">nav</nav>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
        </Routes>
      </Router>

    </div>
  )
}

export default App;
