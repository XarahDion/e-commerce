import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
        //left hand side button styling for the slider
        style={{
            color: "black",
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            cursor: "pointer",
            zIndex: "1",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            transition: "all 0.2s ease-in-out",
        }}
    >
        <ChevronLeft />
    </button>
);

export const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
        style={{
            color: "black",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            zIndex: "10",
            padding: "0",
            margin: "0",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease-in-out",
        }}
    >
        <ChevronRight />
    </button>
);
