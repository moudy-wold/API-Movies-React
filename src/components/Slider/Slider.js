import React from 'react';
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Carousel } from "react-bootstrap";
import './Slider.css';

export default function Slider() {
    const { dataIsEmpty } = useSelector(state => state.info)

    return (
        <div>
            {dataIsEmpty == true &&
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src="./images/slider-1.jpg" alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src="./images/slider-2.jpg" alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src="./images/slider-3.jpg" alt="Third slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src="./images/slider-4.jpg" alt="Fourth slide" />
                    </Carousel.Item>
                </Carousel>
            }
        </div>

    )
}
