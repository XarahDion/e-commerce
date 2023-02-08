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

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        autoplay.current.reset();
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        autoplay.current.reset();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
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
    overflow: hidden;
    background-color: #f6f7fb;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        height: 320px;
        align-items: flex-start;
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
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        @media (max-width: 768px) {
            height: 70%;
        }
    }
`;

export default EmblaCarousel;
