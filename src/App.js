import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MoviesList from './Components/MoviesList';
import Favourites from './Components/Favourites';
import Info from './Components/Info';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {

  // in react-router-dom version 6 switch is replaced by Routes Itself 
  // 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element=
          {
            <>
              <Navbar />,
              <Banner />,
              <MoviesList />
            </>
          }
        >
        </Route>
        <Route path='/favourites' element={<Favourites />}></Route>
        <Route path='/info' element={<Info />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
