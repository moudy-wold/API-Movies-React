import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import "../index.css";
import "./Popus.css";
import { motion } from "framer-motion";
import Info from "../Info/Info";
import PlayVedio from '../PlayVideo/PlayVideo';

export default function Popus(props) {

    var counter = 0;
    const [data, setData] = useState([]);
    // Get Data From API
    const getData = async () => {
        try {
            let response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=7917b1f1a6ceb6e64d447919f0a82eef&language=en-US&page=1");
            let resData = await response.json();
            setData(resData.results);
        } catch (err) {
            console.log(err);
        }
    };
    getData();

    const { searchInputValue } = useSelector(state => state.info);
    var filteredData = data.filter(item => {
        if (searchInputValue == "") {
            return item
        } else if (item.title.toLowerCase().includes(searchInputValue.toLowerCase())) {
            return item
        }
    });
    var carousel = useRef();
    const [popusOffset, setPopusOffset] = useState(false);

    var scroll = window;

    useEffect(() => {
        props.popusOffSet(carousel.current.offsetTop);
        if (window.scrollY > carousel.current.offsetTop - 300 &&
            window.scrollY < (carousel.current.offsetHeight + carousel.current.offsetTop - 400)) {
            setPopusOffset(true)
            props.handleActiveNavbar({ popus: popusOffset })
        } else {
            setPopusOffset(false)
        }
    }, [scroll.scrollY])
    return (
        <div className='popus' ref={carousel}>
            <h1 className="m-4 mb-1 mt-5">Popular Movies</h1>
            {searchInputValue == "" ?
                <motion.div className="films overflow-hidden" whileTap={{ cursor: "grabbing" }}>
                    <motion.div className="film search d-flex w-100vw" drag="x" dragConstraints={{ right: 0, left: -4810 }}>
                        {data.map(item => (
                            <motion.div key={item.id} className="item m-2 text-center">
                                <img className='w-100' src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                                <h3 className='m-2'>{item.title}</h3>
                                <p className='date fw-light'>Release Date: {item.release_date}</p>
                                <p className='fw-light' > Rating: {item.vote_average}</p>
                                <div className='btns d-flex align-items-center'>
                                    <Info prop={item} />
                                    <PlayVedio MovieId={data[counter].id} type="movie" />
                                </div>
                                <div style={{ display: "none" }}>{counter++}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div> : <div className="film search d-flex w-100vw flex-wrap">{filteredData.map(item => (
                    <div key={item.id} className="item m-2 text-center">
                        <img className='w-100' src={item.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}` : "./images/slider-1.jpg"} />
                        <h3 className='m-2'>{item.title}</h3>
                        <p className='date'>Release Date: {item.first_air_date}</p>
                        <div className='btns' >
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