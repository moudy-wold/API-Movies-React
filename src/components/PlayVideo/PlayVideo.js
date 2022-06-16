import React from 'react'
import { Modal, Button } from "@nextui-org/react";
import { useState } from 'react';
import "./playvideo.css";

export default function PlayVedio(props) {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const [trailer, setTrailer] = useState([]);

    const getTrailer = async (props) => {
        console.log(props)
        console.log(props.MovieId)
        var url = "";
        if (props.type === "movie") {
            url = `https://api.themoviedb.org/3/movie/${props.MovieId}/videos?api_key=7917b1f1a6ceb6e64d447919f0a82eef&language=en-US`;
            console.log("if");
        }
        else {
            url = `https://api.themoviedb.org/3/tv/${props.TVId}/videos?api_key=7917b1f1a6ceb6e64d447919f0a82eef&language=en-US`;
            console.log("else-if");

        }

        const response = await fetch(url);
        const responseJson = await response.json();
        // console.log(responseJson);
        const trailerList = responseJson.results.filter((item) => item.type == "Trailer");
        setTrailer(trailerList);

    };

    const getMovieData = () => {
        getTrailer(props);
    }
    return (
        <div>
            <Button color="gradient" auto onClick={() => { handler(); getMovieData() }} className='player-button'>
                <i className="fa fa-play-circle" style={{ fontSize: "30px" }}></i> Play Trailer
            </Button>
            <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler} width="50%" >
                <Modal.Body>
                    <div >
                        <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${trailer[0]?.key}`} ></iframe>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
