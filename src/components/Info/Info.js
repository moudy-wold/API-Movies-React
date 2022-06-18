import React, { useState } from "react";
import { Modal, Button, Image, Text, Row, Col } from "@nextui-org/react";
import "./info.css";


export default function PlayVedio(props) {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
    return (
        <div>
            <Button auto flat color="error" onClick={handler} className='m-2'><i className="fa"></i></Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                width="60%"
            >
                <Modal.Header>
                    <Text b size={25}>
                        {props.prop.name ? props.prop.name : props.prop.title}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <div className='row info-container d-flex justify-content-between '>
                        <div className="col-xs-12 col-6" >
                            <img className='w-100'
                                src={props.prop.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${props.prop.backdrop_path}` : "./images/slider-1.jpg"}
                            />
                        </div>
                        <div className='info-child col-xs-12 col-sm-6 '>
                            <p className="date fs-4">{props.prop.first_air_date}</p>
                            <p className='tagline'> {props.prop.tagline}</p>
                            <h2 className="date mb-4">Overview</h2>
                            <p>{props.prop.overview}</p>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

