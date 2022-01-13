import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MoviesList from './Components/MoviesList';

function App() {
  return (
    <div>
    <Navbar />
    <Banner />
    <MoviesList />
    </div>
  );
}

export default App;
