import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbars from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import Popus from './components/Popus/Popus';
import TopRatedMovies from './components/Top-ratedMovies/TopRatedMovies';
import TopRatedShow from './components/TopRatedShow/TopRatedShow';
import PopularTvShows from './components/PopularTvShows/PopularTvShows';


function App() {
  const [scroll, setScroll] = useState({});
  const [popusoffsetNum, setPopusoffsetNum] = useState();
  const [ratedMoviesOffSetNum, setRatedMoviesOffSetNum] = useState();
  const [ratedShowOffsetNum, setRatedShowOffsetNum] = useState();
  const [tvShowOffsetNum, setTvShowOffsetNum] = useState();


  const handleActiveNavbar = (a) => {
    setScroll(a);

  }
  const popusOffSet = (a) => setPopusoffsetNum(a);
  const ratedMoviesOffSet = (a) => setRatedMoviesOffSetNum(a);
  const ratedShowOffset = (a) => setRatedShowOffsetNum(a);
  const tvShowOffset = (a) => setTvShowOffsetNum(a);



  return (
    <div className="App">
      <Navbars scroll={scroll} popusoffsetNum={popusoffsetNum} ratedMoviesOffSetNum={ratedMoviesOffSetNum} ratedShowOffsetNum={ratedShowOffsetNum} tvShowOffsetNum={tvShowOffsetNum} />
      <Slider />
      <Popus handleActiveNavbar={handleActiveNavbar} popusOffSet={popusOffSet} />
      <TopRatedMovies handleActiveNavbar={handleActiveNavbar} ratedMoviesOffSet={ratedMoviesOffSet} />
      <TopRatedShow handleActiveNavbar={handleActiveNavbar} ratedShowOffset={ratedShowOffset} />
      <PopularTvShows handleActiveNavbar={handleActiveNavbar} tvShowOffset={tvShowOffset} />
    </div>
  );
}

export default App;
