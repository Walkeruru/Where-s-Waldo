import React, { useState, useEffect } from "react";

const Cronometro = (props) => {

    useEffect(() => {
        let intervalId = setInterval(() => props.set(props.time + 1), 10)
        return () => clearInterval(intervalId);
    }, [props.time]);

    // Hours calculation
    const hours = Math.floor(props.time / 360000);

    // Minutes calculation
    const minutes = Math.floor((props.time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((props.time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = props.time % 100;

    return (<p>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
    </p>)
}

export default Cronometro