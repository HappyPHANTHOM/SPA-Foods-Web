import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/recipes/:id' element={<Detail/>} />
          <Route path='/recipe' element={<CreateRecipe/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
