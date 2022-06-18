import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import "../index.css";
import { motion } from "framer-motion";
import Info from "../Info/Info";
import PlayVedio from '../PlayVideo/PlayVideo';


export default function TopRatedShow(props) {
    var counter = 0;
    // For Save Cames Data From API
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=7917b1f1a6ceb6e64d447919f0a82eef&language=en-US&page=1`);
            const resData = await response.json();
            setData(resData.results);
        } catch (err) {
            console.log(err);
        }
    };

    getData();
    // For Check Search Input If Empty Or No
    const { searchInputValue } = useSelector(state => state.info);
    // For Handle Search Proces
    var filteredData = data.filter(item => {
        if (searchInputValue == "") {
            return item
        } else if (item.name.toLowerCase().includes(searchInputValue.toLowerCase())) {
            return item
        }
    });
    var carousel = useRef();
    const [ratedShowOffset, setRatedShow] = useState(0);
    var scroll = window;
    // For Send ScrollTop To Navbar
    useEffect(() => {
        props.ratedShowOffset(carousel.current.offsetTop);
        if (window.scrollY > carousel.current.offsetTop - 200 &&
            window.scrollY < (carousel.current.offsetHeight + carousel.current.offsetTop - 400)) {
            setRatedShow(true)
            props.handleActiveNavbar({ ratedShow: ratedShowOffset })
        } else {
            setRatedShow(false)
        }
    }, [scroll.scrollY])

    return (
        <div className="to-rated-show main" ref={carousel} >
            <h1 className='m-4 mb-1'>Top Rated Show</h1>
            {searchInputValue == "" ?
                <motion.div className="films overflow-hidden" whileTap={{ cursor: "grabbing" }}>
                    <motion.div className="film search d-flex w-100vw" drag="x" dragConstraints={{ right: 0, left: -4810 }}>
                        {filteredData.map(item => (
                            <motion.div className="item m-2 text-center" key={item.id}>
                                <img className='w-100' src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                                <h3 className=' m-2'>{item.name}</h3>
                                <p className="date">Release Date: {item.release_date}</p>
                                <p> Rating: {item.vote_average}</p>
                                <div className='btns d-flex'>
                                    <Info prop={item} />
                                    <PlayVedio TVId={data[counter].id} />
                                </div>
                                <div style={{ display: 'none' }}>{counter++}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div> : <div className="film search d-flex w-100vw flex-wrap">{filteredData.map(item => (
                    <div key={item.id} className="item m-2 overflow-hidden text-center position-relative">
                        <img className='w-100' src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                        <h3 className='m-auto mt-2'>{item.name}</h3>
                        <p className='date'>Release Date: {item.first_air_date}</p>
                        <p> Rating: {item.vote_average}</p>
                        <div className='btns d-flex'>
                            <Info prop={item} />
                            <PlayVedio MovieId={data[counter].id} type="movie" />
                        </div>
                        <div className="d-none">{counter++}</div>
                    </div>
                ))}
                </div>
            }
        </div >
    )
}