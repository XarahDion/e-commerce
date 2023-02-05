import React, { useState, useEffect, useCallback, useRef } from "react";
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";

const EmblaCarousel = ({ slides, options = { loop: false } }) => {
    const autoplay = useRef(
        Autoplay(
            { delay: 3000, stopOnInteraction: false },
            (emblaRoot) => emblaRoot.parentElement // emblaRoot is the carousel container
        )
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]); // <== Here we pass the autoplay instance to the hook
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false); // <== Here we set the state for the prev button
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false); // <== Here we set the state for the next button

    const scrollNext = useCallback(() => {
        // scrollNext is a function that will be called when the next button is clicked
        if (!emblaApi) return;
        emblaApi.scrollNext();
        autoplay.current.reset();
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        // scrollPrev is a function that will be called when the previous button is clicked
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        autoplay.current.reset();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        // onSelect is a function that will be called when the user scrolls the carousel
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        // useEffect is a function that will be called when the component mounts
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="embla">
            <EmblaSlideshowWrapper>
                <div className="embla__viewport" ref={emblaRef}>
                    <EmblaContainer>
                        <img
                            className="embla__slide"
                            src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1668893080/The-smartest-gift_unqq2h.png"
                            alt="slide"
                            onClick={() =>
                                (window.location.href = "/product-page/all")
                            }
                        />
                        <img
                            className="embla__slide"
                            src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1668894683/Health_psar2t.png"
                            alt="slide"
                            onClick={() =>
                                (window.location.href = "/product-page/all")
                            }
                        />
                        <img
                            className="embla__slide"
                            src="https://res.cloudinary.com/dk9mn4cvz/image/upload/v1668893577/Stay-Connected_teiiaz.png"
                            alt="slide"
                            onClick={() =>
                                (window.location.href = "/product-page/all")
                            }
                        />
                    </EmblaContainer>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </EmblaSlideshowWrapper>
        </div>
    );
};

const EmblaSlideshowWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f6f7fb;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;
const EmblaContainer = styled.div`
    display: flex;
    max-width: 1248px;
    height: 500px;
    margin: 0 auto;
    .embla__slide {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
`;

export default EmblaCarousel;
