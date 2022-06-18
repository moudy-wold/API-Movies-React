import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import '../index.css';
import { motion } from "framer-motion";
import Info from "../Info/Info";
import PlayVedio from '../PlayVideo/PlayVideo';

export default function PopularTvShows(props) {
    var counter = 0;
    // For Save Data Camen From API
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=7917b1f1a6ceb6e64d447919f0a82eef&language=en-US&page=1`)
            const resData = await response.json();
            setData(resData.results);
        } catch (err) {
            console.log(err);
        }
    }

    getData();

    // For Check Input Search Is Empty Or No
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

    const [tvShowOffset, setTvShow] = useState(0);
    var scroll = window;
    // For Send ScroolTop Top NAvbar
    useEffect(() => {
        props.tvShowOffset(carousel.current.offsetTop);
        if (window.scrollY > carousel.current.offsetTop - 200 &&
            window.scrollY < (carousel.current.offsetHeight + carousel.current.offsetTop - 400)) {
            setTvShow(true)
            props.handleActiveNavbar({ tvShow: tvShowOffset })
        } else {
            setTvShow(false)
        }
    }, [scroll.scrollY])

    return (
        <div className='tv-show main' ref={carousel}>
            <h1 className='m-4 mb-1'>Popular Tv Shows</h1>
            {searchInputValue == "" ?
                <motion.div className="films overflow-hidden" whileTap={{ cursor: "grabbing" }}>
                    <motion.div className="film search d-flex w-100vw" drag="x" dragConstraints={{ right: 0, left: -4810 }}>
                        {filteredData.map(item => (
                            <motion.div className='item m-2 text-center' key={item.id}>
                                <img className="w-100" src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                                <h3 className='m-2'>{item.name}</h3>
                                <p className='date'>Release Date: {item.release_date}</p>
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
                    <div key={item.id} className="item m-2 text-center">
                        <img className='w-100' src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                        <h3 className='m-2'>{item.name}</h3>
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