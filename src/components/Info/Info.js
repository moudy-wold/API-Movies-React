import React, { useState } from "react";
import { Modal, Button, Image, Text, Row, Col } from "@nextui-org/react";
import "./info.css";


export default function PlayVedio(props) {
    const [visible, setVisible] = useState(false);
    const handler = () => { setVisible(true); console.log(props.prop) };
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
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
                <Modal.Header css={{ position: "absolute", zIndex: "$1", top: 5, left: "50%", transform: "translateX(-50%)" }} >
                    <Text b size={25}>
                        {props.prop.name}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='info-container'>
                            <Col >
                                <div >
                                    <Image
                                        showSkeleton
                                        src={props.prop.backdrop_path != null ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${props.prop.backdrop_path}` : "./images/slider-1.jpg"}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className='info-child ms-3'>
                                    <p className="date  fs-4">{props.prop.first_air_date}</p>
                                    <p className='tagline'> {props.prop.tagline}</p>
                                    <h2 className="date mt-5 mb-4">Overview</h2>
                                    <p>{props.prop.overview}</p>
                                </div>
                            </Col>
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

