import React, { useState, useEffect } from "react"
import "../css/Header.css"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

const Header = ({ data }) => {
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(interval) // Cleanup the interval on component unmount
    }, [slide])

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1)
    }

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1)
    }
    return (
        <div className="testimonial">
            <BsArrowLeftCircleFill
                onClick={prevSlide}
                className="arrow arrow-left"
            />
            {data.map((item, idx) => {
                return (
                    <img
                        src={item.src}
                        alt={item.alt}
                        key={idx}
                        className={
                            slide === idx ? "slide" : "slide slide-hidden"
                        }
                    />
                )
            })}
            <BsArrowRightCircleFill
                onClick={nextSlide}
                className="arrow arrow-right"
            />
            <span className="indicators">
                {data.map((_, idx) => {
                    return (
                        <button
                            key={idx}
                            className={
                                slide === idx
                                    ? "indicator"
                                    : "indicator indicator-inactive"
                            }
                            onClick={() => setSlide(idx)}
                        ></button>
                    )
                })}
            </span>
        </div>
    )
}

export default Header
